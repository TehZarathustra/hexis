#!/usr/bin/env zsh

TMUX_UTILS="$tmuxUtils"
OUTPUT_FOLDER="$outputFolder"
TEMPLATE="$template"

source "${TMUX_UTILS}"

YEAR=$(date +"%Y")
DATE=$(date +"%m%d%H%M%S")

PREFIX="${NAME:+${NAME}-}"
ID="${PREFIX}${DATE}"
FOLDER_PATH="${OUTPUT_FOLDER}/${YEAR}/${ID}"

SESSION="sandbox-react-${ID}"

VITE_INIT_CMD="npm create vite sandbox -- --template react-ts --no-interactive"
VITE_POST_CMD="cd sandbox"
VITE_NPMRC="echo 'registry=https://registry.npmjs.org/' > .npmrc"
OPEN_BROWSER="open -a 'Brave Browser' http://localhost:5173"
VITE_INSTALL="npm i && npm run dev"

create_files() {
  mkdir -p "${FOLDER_PATH}/sandbox"
}

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${FOLDER_PATH}"
  # send vite cmd
  tmux send-keys -t "$SESSION" "$VITE_INIT_CMD" C-m
  tmux send-keys -t "$SESSION" "$VITE_POST_CMD" C-m
  tmux send-keys -t "$SESSION" "$VITE_NPMRC" C-m
  tmux send-keys -t "$SESSION" "$VITE_INSTALL & $OPEN_BROWSER" C-m
  tmux send-keys -t "$SESSION" "cp -rf ${TEMPLATE} ${FOLDER_PATH}/sandbox/" C-m
  # split?
  tmux split-window -v -b -t "$SESSION" -c "${FOLDER_PATH}/sandbox"
  tmux send-keys -t "$SESSION:0.0" "nvim" C-m
  tmux select-window -t "$SESSION:0.0"
}

create_alacritty_window() {
  alacritty msg create-window \
    --title "${SESSION}" \
    --working-directory "${FOLDER_PATH}" \
    --command "$(command -v tmux)" attach-session -t "${SESSION}"
}

wait_and_zoom() {
  sleep 8
  tmux resize-pane -Z -t "$SESSION:0.0"
}

create_files
create_tmux_session
create_alacritty_window
wait_and_zoom
