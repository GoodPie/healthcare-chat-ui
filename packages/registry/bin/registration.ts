#!/usr/bin/env node

import { Command } from 'commander';
import { registerCommand } from '../src';
import { 
  createComponentCommand,
  validateCommand,
  docsCommand 
} from '@healthcare-chat/tools';

// Create the root command
const program = new Command()
  .name('registry')
  .description('Developer tools for Healthcare Chat UI Kit component registry')
  .version('0.1.0');

// Add commands
program.addCommand(registerCommand);
program.addCommand(createComponentCommand);
program.addCommand(validateCommand);
program.addCommand(docsCommand);

// Parse command line arguments
program.parse(process.argv);
