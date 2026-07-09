import {spawnSync} from 'node:child_process'
import {resolve} from 'node:path';

const {dirname} = import.meta;

export const tsSandbox = () => {
  const root = resolve(dirname, '../../..');
  const {script, ...rest} = {
    script: resolve(dirname, 'start_session.sh'),
    tmuxUtils: resolve(root, 'utils', 'tmux.sh'),
    outputFolder: resolve(root, '..', 'files'),
    // filename: also can specify filename directly
  };

  const res = spawnSync('sh', [script], {
    env: {
      ...process.env,
      ...rest,
    },
    // connect directly to terminal
    // ie 'pipe' for i/o inside node (good for debug)
    stdio: 'inherit',
    encoding: 'utf8'
  });

  // debug
  // console.log({
  //   error: res.error,
  //   status: res.status,
  //   signal: res.signal,
  //   stdout: res.stdout,
  //   stderr: res.stderr,
  // });

  return `session is established: ${res.status}`;
}
