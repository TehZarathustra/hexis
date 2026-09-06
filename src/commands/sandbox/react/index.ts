import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {
  getParentDir,
  getTemplateDir,
  getTargetDir,
  getStartSH,
  getResumeSH,
  getTmuxUtils,
} from './config.ts';

type Action =
  | {
      type: 'start';
      script: string;
      directory: string;
      templateDir: string;
    }
  | {
      type: 'resume';
      script: string;
      directory: string;
      name: string;
    }
  | {type: 'error'; reason: string};

type ActionResolver = Record<
  'create' | 'resume',
  (arg: string) => Action
>
const ACTIONS = {
  create: () => ({
    type: 'start',
    script: getStartSH(),
    directory: getParentDir(),
    templateDir: getTemplateDir(),
  }),
  resume: (location: string) => {
    const targetDir = getTargetDir(location);
    const [_, name] = location.split('/');

    const error = (reason: string): Action => ({
      type: 'error',
      reason,
    });

    const ready = (): Action => ({
      type: 'resume',
      script: getResumeSH(),
      directory: targetDir,
      name,
    });

    return existsSync(targetDir)
      ? ready()
      : error(`session doesn't exist: ${location}`);
  }
} satisfies ActionResolver;

const isAction = (str: string): str is keyof typeof ACTIONS =>
  Object.hasOwn(ACTIONS, str);

export const reactSandbox = ([cmd, target]: string[]) => {
  const action = isAction(cmd)
    ? ACTIONS[cmd](target)
    : ACTIONS.create();

  if (action.type === 'error') return action.reason;

  const {script, ...opts} = action;

  const res = spawnSync('sh', [script], {
    env: {
      ...process.env,
      ...opts,
      tmuxUtils: getTmuxUtils(),
    },
    stdio: 'inherit',
    encoding: 'utf8',
  });

  return `session is established: ${res.status}`;
};
