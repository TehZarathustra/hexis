import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const {dirname} = import.meta;
const root = resolve(dirname, '../../..');

const FOLDER_NAME = 'react';

export const reactSandbox = (_: unknown) => {
  const {script, ...rest} = {
    script: resolve(dirname, 'start_session.sh'),
    tmuxUtils: resolve(root, 'utils', 'tmux.sh'),
    outputFolder: resolve(root, '..', 'files', FOLDER_NAME),
    template: resolve(dirname, 'src'),
  };

  const res = spawnSync('sh', [script], {
    env: {...process.env, ...rest},
    stdio: 'inherit',
    encoding: 'utf8',
  });

  return `session is established: ${res.status}`;
};
