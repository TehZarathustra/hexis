import {resolve} from 'node:path';
import {homedir} from 'node:os';
import {existsSync} from 'node:fs';
import {readFileSync} from 'node:fs';

// @TODO dotfile candidate
// will build the config once i'm satisfied
const SPELLS_PATH = 'obsidian-vault/8 – Tech/spells';
const getSpellPath = (spell: string) => resolve(
  homedir(),
  SPELLS_PATH,
  `${spell}.md`
);

export const spells = () => ({
  spells: ([spell]: string[]) => {
    if (!spell) return 'cannot list spells yet';

    const path = getSpellPath(spell);

    if (!existsSync(path)) return `${spell} is missing`;

    return readFileSync(path, 'utf8')
      .split('\n')
      .filter(line => !line.startsWith('```'))
      .join('\n');
  }
});
