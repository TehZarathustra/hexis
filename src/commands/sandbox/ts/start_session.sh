#!/usr/bin/env zsh

TMUX_UTILS="$tmuxUtils"
DIRECTORY="$directory"

source "${TMUX_UTILS}"

YEAR=$(date +"%Y")
DATE=$(date +"%m%d%H%M%S")

PREFIX="${NAME:+${NAME}-}"
FOLDER_PATH="${DIRECTORY}/${YEAR}"
FILE_NAME="${PREFIX}${DATE}"
FILE_PATH="${FOLDER_PATH}/${FILE_NAME}.ts"

SESSION="sandbox-ts-${FILE_NAME}"

NVIM_CMD="nvim ${FILE_NAME}.ts \
  -c 'rightbelow vsplit | terminal node --watch ${FILE_NAME}.ts' \
  -c 'wincmd p'"

create_files() {
  mkdir -p "${FOLDER_PATH}"
  touch "${FILE_PATH}"
}

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${FOLDER_PATH}"
  tmux send-keys -t "$SESSION" "$NVIM_CMD" C-m

  if in_tmux; then
    tmux switch-client -t "${SESSION}"
  else
    tmux attach -t "${SESSION}"
  fi
}

create_files
create_tmux_session
