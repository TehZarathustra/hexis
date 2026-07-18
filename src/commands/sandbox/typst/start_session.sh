#!/usr/bin/env zsh

TMUX_UTILS="$tmuxUtils"
OUTPUT_FOLDER="$outputFolder"

source "${TMUX_UTILS}"

YEAR=$(date +"%Y")
DATE=$(date +"%m%d%H%M%S")

PREFIX="${NAME:+${NAME}-}"
ID="${PREFIX}${DATE}"
FOLDER_PATH="${OUTPUT_FOLDER}/${YEAR}/${ID}"
FILE_NAME="${ID}.typ"
FILE_OUTPUT_NAME="${ID}.pdf"
FILE_PATH="${FOLDER_PATH}/${FILE_NAME}"
FILE_OUTPUT_PATH="${FOLDER_PATH}/${FILE_OUTPUT_NAME}"

SESSION="sandbox-typst-${ID}"
NVM_CMD="nvm use 24"

# `+setlocal makeprg` is kinda unneseccary since
# it meant to run in watch mode
NVIM_CMD="nvim ${FILE_NAME}"

create_files() {
  mkdir -p "${FOLDER_PATH}"
  touch "${FILE_PATH}"
}

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${FOLDER_PATH}"
  tmux new-window -t "${SESSION}" -n compile
  tmux send-keys -t "$SESSION:0" "$NVM_CMD && $NVIM_CMD" C-m
  tmux send-keys -t "$SESSION:1" "typst watch $FILE_PATH" C-m
  tmux select-window -t "$SESSION:0"
}

# @TODO maybe move tmux bin into utils
create_alacritty_window() {
  alacritty msg create-window \
    --title "${SESSION}" \
    --working-directory "${FOLDER_PATH}" \
    --command "$(command -v tmux)" attach-session -t "${SESSION}"
}

# @TODO i probably don't need this focused thereafter
open_skim() {
  sleep 5 # wait five seconds for typst compile
  open -a Skim "${FILE_OUTPUT_PATH}"
}

# aerospace impl. relies on window-detect
# basically an event based model
# something to change in the future
create_files
create_tmux_session
create_alacritty_window
open_skim
