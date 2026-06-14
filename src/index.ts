#!/usr/bin/env node
import {argv} from 'node:process';
import {resolver} from './commands/resolver.ts';

resolver(argv);
