#!/usr/bin/env node
import { Command } from 'commander';
import { 
  registerCommand,
  createComponentCommand,
  validateCommand,
  docsCommand
} from '../src';

// Create the root command
const program = new Command()
  .name('component-tools')
  .description('Developer tools for Healthcare Chat UI Kit component management')
  .version('0.1.0');

// Add commands
program.addCommand(registerCommand);
program.addCommand(createComponentCommand);
program.addCommand(validateCommand);
program.addCommand(docsCommand);

// Parse command line arguments
program.parse(process.argv);
