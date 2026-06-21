#!/bin/sh

in_tmux() {
  [ -n "$TMUX" ]
}

tmux_resolve_current() {
  in_tmux && tmux detach
}
