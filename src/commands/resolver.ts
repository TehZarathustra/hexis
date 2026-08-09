import {sandbox} from './sandbox/index.ts';
import {spells} from './spells/index.ts';
import {focus} from './focus/index.ts';
import {styleText} from 'node:util';

const normalizeArgv = ([_, __, ...cmds]: string[]) => cmds;

type Cmd = (params: string[]) => string;

export const resolver = (argv: string[]) => {
  const [cmd, ...params] = normalizeArgv(argv);

  const cmds: Record<string, Cmd> = {
    ...sandbox(),
    ...spells(),
    ...focus(),
  };

  const tool = cmds[cmd];

  return tool
    ? hexisOut(tool(params))
    : hexisOut(`non existing tool: ${cmd}, try -h`);
}

const hexisOut = (str: string) => console.log(
  styleText('gray', str)
);
