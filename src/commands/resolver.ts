import {sandbox} from './sandbox/index.ts';

const normalizeArgv = ([_, __, ...cmds]: string[]) => cmds;

export const resolver = (argv: string[]) => {
  const [cmd, ...params] = normalizeArgv(argv);

  // in outer scope? build immideatly?
  const cmds = {
    ...sandbox()
  };

  const tool = cmds[cmd];

  if (!tool) return console.log(`non existing tool: ${cmd}, try -h`);

  console.log(tool(params));
}
