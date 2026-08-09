#!/usr/bin/env zsh

CLEAR="$clear"

rm -f hosts\
&& awk -f "$CLEAR" /etc/hosts > hosts\
&& sudo mv hosts /etc/hosts
