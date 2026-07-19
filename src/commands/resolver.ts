import {sandbox} from './sandbox/index.ts';
import {spells} from './spells/index.ts';

const normalizeArgv = ([_, __, ...cmds]: string[]) => cmds;

type Cmd = (params: string[]) => unknown;

export const resolver = (argv: string[]) => {
  const [cmd, ...params] = normalizeArgv(argv);

  const cmds: Record<string, Cmd> = {
    ...sandbox(),
    ...spells(),
  };

  const tool = cmds[cmd];

  if (!tool) return console.log(`non existing tool: ${cmd}, try -h`);

  console.log(tool(params));
}
