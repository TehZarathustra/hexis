import {spawnSync} from 'node:child_process';
import {
  getParentDir,
  getStartSH,
  getTemplateDir,
  getTmuxUtils,
} from './config.ts';

export const reactSandbox = (_: unknown) => {
  const {script, ...rest} = {
    script: getStartSH(),
    tmuxUtils: getTmuxUtils(),
    outputFolder: getParentDir(),
    template: getTemplateDir(),
  };

  const res = spawnSync('sh', [script], {
    env: {...process.env, ...rest},
    stdio: 'inherit',
    encoding: 'utf8',
  });

  return `session is established: ${res.status}`;
};
