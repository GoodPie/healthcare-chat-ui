#!/usr/bin/env node

import { Command } from 'commander';
import { addCommand } from './commands/add';
import { registerCommand } from './commands/register';
import { initCommand } from './commands/init';

// Create the root command
const program = new Command()
  .name('healthcare-chat-ui')
  .description('CLI for Healthcare Chat UI Kit')
  .version('0.1.0');

// Add commands
program.addCommand(addCommand);

// Register command
program.addCommand(registerCommand);

// Init command
program.addCommand(initCommand);

// Parse command line arguments
program.parse(process.argv);
