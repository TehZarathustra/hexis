#!/usr/bin/env zsh

CLEAR="$clear"
HOSTS_TO_BLOCK="$hostsToBlock"

rm -f hosts\
&& awk -f "$CLEAR" /etc/hosts > hosts\
&& cat "$HOSTS_TO_BLOCK" >> hosts\
&& sudo mv hosts /etc/hosts
