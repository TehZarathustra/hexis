#!/bin/bash

SESSION="hexis-dev"
VIM_WINDOW="vim"

function start_session() {
  # Create session & windows
  tmux new-session -d -s "$SESSION" -n "$VIM_WINDOW";

  # VIM window setup
  # not sure if want split immideatly
  # tmux split-window -h -t "$SESSION:0";
  tmux send-keys -t "$SESSION:0.0" "nvim ." C-m;

  # Focus back to VIM window
  tmux select-pane -t "$SESSION:0.0";

  # Attach to session
  tmux attach -t "$SESSION";
}

# some work still need to be done
# ie check if inside tmux
#   switch instead attach
#   exit and create?
if tmux has-session -t "$SESSION";
then
  tmux attach -t "$SESSION"
else
  start_session
fi
