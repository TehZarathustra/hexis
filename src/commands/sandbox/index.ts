// @TODO move into project-wide conf
// const PATH
import {tsSandbox} from './ts/index.ts';

const aliases = ['sandbox', 'sb'] as const;

export const sandbox = () => {
  const entry = (_params: string[]) => {
    const [sb, ...params] = _params;

    const availableSandboxes: Record<string, (p: unknown) => void> = {
      ts: tsSandbox,
    };

    const sandBoxToLaunch = availableSandboxes[sb];

    if (!sandBoxToLaunch) return console.log(`not supported ${sb}`);

    sandBoxToLaunch(params);
  }

  return Object.fromEntries(aliases.map(a => [a, entry]));
}
