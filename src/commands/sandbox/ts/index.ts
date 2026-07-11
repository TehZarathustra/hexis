import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const {dirname} = import.meta;
const root = resolve(dirname, '../../..');

export const tsSandbox = (_: unknown) => {
  const {script, ...rest} = {
    script: resolve(dirname, 'start_session.sh'),
    tmuxUtils: resolve(root, 'utils', 'tmux.sh'),
    outputFolder: resolve(root, '..', 'files'),
    // filename: also can specify filename directly
    // but most of the time i'd rather use the gen one
  };

  // after eval res can be read as {error, stdout} etc
  const res = spawnSync('sh', [script], {
    env: {
      ...process.env,
      ...rest,
    },
    // 'inherit' connects directly to terminal
    // i.e 'pipe' for i/o inside node (good for debug)
    stdio: 'inherit',
    encoding: 'utf8'
  });

  return `session is established: ${res.status}`;
};
