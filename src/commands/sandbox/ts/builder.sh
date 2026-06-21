#!/usr/bin/env zsh

source ../../../utils/tmux.sh

# @TODO better path
ROOT_PATH="../../../../files"
CMD_PREFIX="ts"
PREFIX="${NAME:+${NAME}-}"
YEAR=$(date +"%Y")
DATE=$(date +"%m%d%H%M%S")
FOLDER_PATH="${ROOT_PATH}/${YEAR}"
FILE_NAME="${PREFIX}${DATE}"
FILE_PATH="${FOLDER_PATH}/${FILE_NAME}.ts"

SESSION="sandbox-ts-${FILE_NAME}"

create_files() {
  mkdir -p "${FOLDER_PATH}"
  touch "${FILE_PATH}"
}

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${FOLDER_PATH}"
  tmux send-keys -t "$SESSION" "nvim ${FILE_NAME}.ts" C-m

  if in_tmux; then
    tmux switch-client -t "${SESSION}"
  else
    tmux attach -t "${SESSION}"
  fi
}

create_files
create_tmux_session
