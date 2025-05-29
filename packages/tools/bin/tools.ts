#!/usr/bin/env node

import { Command } from 'commander';
import { createComponentCommand } from '../src';
import { validateCommand } from '../src';
import { docsCommand } from '../src';

// Create the root command
const program = new Command()
  .name('healthcare-chat-tools')
  .description('Developer tools for Healthcare Chat UI Kit')
  .version('0.1.0');

// Add commands
program.addCommand(createComponentCommand);
program.addCommand(validateCommand);
program.addCommand(docsCommand);

// Parse command line arguments
program.parse(process.argv);
