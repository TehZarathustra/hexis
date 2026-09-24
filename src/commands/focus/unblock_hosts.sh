#!/usr/bin/env zsh

CLEAR="$clear"
HOSTS_TEMP="$tempHosts"

awk -f "$CLEAR" /etc/hosts > "$HOSTS_TEMP"\
&& sudo mv "$HOSTS_TEMP" /etc/hosts
