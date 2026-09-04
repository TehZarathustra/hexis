#!/usr/bin/env zsh

TMUX_UTILS="$tmuxUtils"
FOLDER_PATH="$directory"
FILE_NAME="$fileName"

source "${TMUX_UTILS}"

SESSION="sandbox-ts-${FILE_NAME}"

NVIM_CMD="nvim ${FILE_NAME}.ts \
  -c 'rightbelow vsplit | terminal node --watch ${FILE_NAME}.ts' \
  -c 'wincmd p'"

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${FOLDER_PATH}"
  tmux send-keys -t "$SESSION" "$NVIM_CMD" C-m

  if in_tmux; then
    tmux switch-client -t "${SESSION}"
  else
    tmux attach -t "${SESSION}"
  fi
}

create_tmux_session
