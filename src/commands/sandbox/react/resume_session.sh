#!/usr/bin/env zsh

TMUX_UTILS="$tmuxUtils"
DIR_PATH="$directory"
SESSION="$name"

source "${TMUX_UTILS}"

SESSION="sandbox-react-${SESSION}"

OPEN_BROWSER="open -a 'Brave Browser' http://localhost:5173"
VITE_INSTALL="npm i && npm run dev"

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${DIR_PATH}"

  # send vite cmd
  tmux send-keys -t "$SESSION" "$VITE_INSTALL & $OPEN_BROWSER" C-m

  # split?
  tmux split-window -v -b -t "$SESSION" -c "${DIR_PATH}"
  tmux send-keys -t "$SESSION:0.0" "nvim" C-m
  tmux select-window -t "$SESSION:0.0"
}

create_alacritty_window() {
  alacritty msg create-window \
    --title "${SESSION}" \
    --working-directory "${DIR_PATH}" \
    --command "$(command -v tmux)" attach-session -t "${SESSION}"
}

wait_and_zoom() {
  sleep 8
  tmux resize-pane -Z -t "$SESSION:0.0"
}

create_tmux_session
create_alacritty_window
wait_and_zoom
