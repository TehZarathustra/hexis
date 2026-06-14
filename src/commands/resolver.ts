import {sandbox} from './sandbox/index.ts';

const normalizeArgv = ([_, __, ...cmds]: string[]) => cmds;

export const resolver = (argv: string[]) => {
  const args = normalizeArgv(argv);

  console.log('args >>>', args);

  sandbox();
}
