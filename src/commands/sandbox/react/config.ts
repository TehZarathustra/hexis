import {resolve} from 'node:path';

const {dirname} = import.meta;
const root = resolve(dirname, '../../..');

const PARENT_DIR = 'react';
const START_SH = 'start_session.sh';
const RESUME_SH = 'resume_session.sh';

export const getStartSH = () => resolve(dirname, START_SH);
export const getResumeSH = () => resolve(dirname, RESUME_SH);

// global conf candidate?
export const getTmuxUtils = () => resolve(root, 'utils', 'tmux.sh');

export const getParentDir = (addon: string = '') =>
  resolve(root, '..', 'files', PARENT_DIR, addon);

export const getTemplateDir = () => resolve(dirname, 'src');
