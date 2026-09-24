#!/usr/bin/env zsh

CLEAR="$clear"
HOSTS_TO_BLOCK="$hostsToBlock"
HOSTS_TEMP="$tempHosts"

awk -f "$CLEAR" /etc/hosts > "$HOSTS_TEMP"\
&& cat "$HOSTS_TO_BLOCK" >> "$HOSTS_TEMP"\
&& sudo mv "$HOSTS_TEMP" /etc/hosts
