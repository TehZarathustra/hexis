import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {
  getParentDir,
  getResumeSH,
  getStartSH,
  getTargetFile,
  getTmuxUtils
} from './config.ts';

type Action =
  | {type: 'start'; script: string; directory: string}
  | {
      type: 'resume';
      script: string;
      directory: string;
      fileName: string;
    }
  | {type: 'error'; reason: string};

type ActionResolvers = Record<
  'create' | 'resume',
  (arg: string) => Action
>;

const ACTIONS = {
  create: () => ({
    type: 'start',
    script: getStartSH(),
    directory: getParentDir(),
  }),
  resume: (location: string) => {
    const targetFile = getTargetFile(location);
    const [year, fileName] = location.split('/');

    const error = (reason: string): Action => ({
      type: 'error',
      reason,
    });

    const ready = (): Action => ({
      type: 'resume',
      script: getResumeSH(),
      directory: getParentDir(year),
      fileName,
    });

    return existsSync(targetFile)
      ? ready()
      : error(`session doesn't exist: ${location}`);
  },
} satisfies ActionResolvers;

const isAction = (str: string): str is keyof typeof ACTIONS =>
  Object.hasOwn(ACTIONS, str);

export const tsSandbox = ([cmd, target]: string[]) => {
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
    // 'inherit' connects directly to terminal
    // i.e 'pipe' for i/o inside node (good for debug)
    stdio: 'inherit',
    encoding: 'utf8',
  });

  return `session is established: ${res.status}`;
};
