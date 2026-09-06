#!/bin/sh

in_tmux() {
  [ -n "$TMUX" ]
}

tmux_resolve_current() {
  in_tmux && tmux detach
}

tmux_smart_attach() {
  if in_tmux; then
    tmux switch-client -t "$1"
  else
    tmux attach -t "$1"
  fi
}
