import {tsSandbox} from './ts/index.ts';

const aliases = ['sandbox', 'sb'] as const;
const availableSandboxes = {
  ts: tsSandbox,
} as const;

type Sandbox = keyof typeof availableSandboxes;

const isSupported = (sb: string): sb is Sandbox =>
  Object.hasOwn(availableSandboxes, sb);

export const sandbox = () => {
  const entry = (_params: string[]) => {
    const [sb, ...params] = _params;

    if (!isSupported(sb)) return `not supported ${sb}`;

    return availableSandboxes[sb](params);
  };

  return Object.fromEntries(aliases.map(a => [a, entry]));
}
