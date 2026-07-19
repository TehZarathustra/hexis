import {resolve} from 'node:path';
import {homedir} from 'node:os';
import {existsSync} from 'node:fs';
import {readFileSync} from 'node:fs';

// @TODO dotfile candidate
// will build the config once i'm satisfied
const SPELLS_PATH = 'obsidian-vault/8 – Tech/spells';

// @TODO should think about ADT interface
// and better effect composition
// for now it's small and imperative
// acceptable for what it is
export const spells = () => {
  return {
    // effects in question: validate & read
    spells: ([spell]: string[]) => {
      if (!spell) return 'cannot list spells yet';

      const spellPath = resolve(
        homedir(),
        SPELLS_PATH,
        `${spell}.md`
      );

      if (!existsSync(spellPath)) return `${spell} is missing`;

      return readFileSync(spellPath, 'utf8');
    }
  };
}
