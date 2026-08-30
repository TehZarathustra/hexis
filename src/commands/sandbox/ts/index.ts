import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const {dirname} = import.meta;
const root = resolve(dirname, '../../..');

const PARENT_FOLDER = 'ts';

type Action =
  | {type: 'ready'; script: string; directory: string}
  | {type: 'error'; reason: string};

type ActionResolvers = Record<
  'create' | 'resume',
  (arg: string) => Action
>;

const ACTIONS = {
  create: () => ({
    type: 'ready',
    script: resolve(dirname, 'start_session.sh'),
    directory: resolve(root, '..', 'files', PARENT_FOLDER),
  }),
  resume: (dir: string) => {
    const directory = resolve(root, '..', 'files', PARENT_FOLDER, dir);

    const error = (reason: string): Action => ({
      type: 'error',
      reason,
    });

    const ready = (): Action => ({
      type: 'ready',
      script: resolve(dirname, 'resume_session.sh'),
      directory,
    });

    return existsSync(directory)
      ? ready()
      : error(`session doesn't exist: ${dir}`);
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
      tmuxUtils: resolve(root, 'utils', 'tmux.sh')
    },
    // 'inherit' connects directly to terminal
    // i.e 'pipe' for i/o inside node (good for debug)
    stdio: 'inherit',
    encoding: 'utf8',
  });

  return `session is established: ${res.status}`;
};
