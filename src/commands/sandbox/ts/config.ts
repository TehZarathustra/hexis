import {resolve} from 'node:path';

const {dirname} = import.meta;
const root = resolve(dirname, '../../..');

const PARENT_DIR = 'ts';
const START_SH = 'start_session.sh';
const RESUME_SH = 'resume_session.sh';

export const getStartSH = () => resolve(dirname, START_SH);
export const getResumeSH = () => resolve(dirname, RESUME_SH);

export const getParentDir = (addon: string = '') =>
  resolve(root, '..', 'files', PARENT_DIR, addon);

export const getTargetFile = (filename: string) =>
  resolve(getParentDir(), `${filename}.ts`);

export const getTmuxUtils = () => resolve(root, 'utils', 'tmux.sh');
