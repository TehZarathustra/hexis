#!/usr/bin/env zsh

TMUX_UTILS="$tmuxUtils"
DIR_PATH="$directory"
NAME="$name"

source "${TMUX_UTILS}"

SESSION="sandbox-typst-${SESSION}"

NVIM_CMD="nvim "${NAME}".typ"

create_tmux_session() {
  tmux new-session -d -s "${SESSION}" -c "${DIR_PATH}"
  tmux new-window -t "${SESSION}" -n compile -c "${DIR_PATH}"
  tmux send-keys -t "$SESSION:0" "$NVIM_CMD" C-m
  tmux send-keys -t "$SESSION:1" "typst watch "${NAME}".typ" C-m
  tmux select-window -t "$SESSION:0"
}

create_alacritty_window() {
  alacritty msg create-window \
    --title "${SESSION}" \
    --working-directory "${DIR_PATH}" \
    --command "$(command -v tmux)" attach-session -t "${SESSION}"
}

open_skim() {
  sleep 5 # wait five seconds for typst compile
  open -a Skim "${DIR_PATH}/${NAME}.pdf"
}

create_tmux_session
create_alacritty_window
open_skim
