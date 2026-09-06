import {resolve} from 'node:path';

const {dirname} = import.meta;
const root = resolve(dirname, '../../..');

const PARENT_DIR = 'typst';
const START_SH = 'start_session.sh';
const RESUME_SH = 'resume_session.sh';

export const getStartSH = () => resolve(dirname, START_SH);
export const getResumeSH = () => resolve(dirname, RESUME_SH);

export const getTmuxUtils = () =>
  resolve(root, 'utils', 'tmux.sh');

export const getParentDir = () =>
  resolve(root, '..', 'files', PARENT_DIR);

export const getTargetDir = (dirname: string) =>
  resolve(getParentDir(), dirname);
