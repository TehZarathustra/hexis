import {sandbox} from './sandbox/index.ts';
import {spells} from './spells/index.ts';
import {focus} from './focus/index.ts';

const normalizeArgv = ([_, __, ...cmds]: string[]) => cmds;

type Cmd = (params: string[]) => unknown;

export const resolver = (argv: string[]) => {
  const [cmd, ...params] = normalizeArgv(argv);

  const cmds: Record<string, Cmd> = {
    ...sandbox(),
    ...spells(),
    ...focus(),
  };

  const tool = cmds[cmd];

  if (!tool) return console.log(`non existing tool: ${cmd}, try -h`);

  // some unified stdout?
  console.log(tool(params));
}
