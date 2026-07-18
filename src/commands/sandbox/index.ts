import {tsSandbox} from './ts/index.ts';
import {typstSandbox} from './typst/index.ts';

// main command aliases
const aliases = ['sandbox', 'sb'] as const;

// this is actually good for declarations
const availableSandboxes = {
  // ts aliases
  ts: tsSandbox,
  typescript: tsSandbox,
  // typst aliases
  typst: typstSandbox,
  typ: typstSandbox
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
