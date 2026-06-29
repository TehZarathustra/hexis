#!/usr/bin/env zsh

ROOT="$hexis_path"

source "${hexis_path}/src/utils/tmux.sh"

YEAR=$(date +"%Y")
DATE=$(date +"%m%d%H%M%S")

PREFIX="${NAME:+${NAME}-}"
FOLDER_PATH="${ROOT}/files/${YEAR}"
FILE_NAME="${PREFIX}${DATE}"
FILE_PATH="${FOLDER_PATH}/${FILE_NAME}.ts"

SESSION="sandbox-ts-${FILE_NAME}"

NVM_CMD="nvm use 24"
NVIM_CMD="nvim ${FILE_NAME}.ts '+setlocal makeprg=node\ %'"

create_files() {
  mkdir -p "${FOLDER_PATH}"
  touch "${FILE_PATH}"
}

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${FOLDER_PATH}"
  tmux send-keys -t "$SESSION" "$NVM_CMD && $NVIM_CMD" C-m

  if in_tmux; then
    tmux switch-client -t "${SESSION}"
  else
    tmux attach -t "${SESSION}"
  fi
}

create_files
create_tmux_session
