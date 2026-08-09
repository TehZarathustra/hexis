#!/usr/bin/env zsh

rm -f hosts\
&& awk -f clear.awk /etc/hosts > hosts\
&& sudo mv hosts /etc/hosts
