#!/usr/bin/env zsh

rm -f hosts\
&& awk -f clear.awk /etc/hosts > hosts\
&& cat hosts_to_block >> hosts\
&& sudo mv hosts /etc/hosts
