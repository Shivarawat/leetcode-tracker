#!/usr/bin/env node

// Entry point for the CLI. Registers all commands using Commander.js.
// Commander parses process.argv and routes to the correct command handler.
// Run: leetcode-tracker <command> [args] [options]

const { Command } = require('commander');
const program = new Command();

const add = require('./src/commands/add');
const comment = require('./src/commands/comment');
const takeaway = require('./src/commands/takeaway');
const approach = require('./src/commands/approach');
const show = require('./src/commands/show');
const list = require('./src/commands/list');
const revisit = require('./src/commands/revisit');
const review = require('./src/commands/review');
const stats = require('./src/commands/stats');
const digest = require('./src/commands/digest');
const deleteCmd = require('./src/commands/deleteCmd');
const exportCmd = require('./src/commands/exportCmd');
const importCmd = require('./src/commands/importCmd');

program
  .name('leetcode-tracker')
  .description('Personal LeetCode problem tracker with approaches, takeaways, and topic digests')
  .version('1.0.0');

// Add a new problem to the local JSON store
program
  .command('add <id> <title> <difficulty>')
  .description('Add a new problem')
  .option('--topic <topic>', 'Topic (e.g. graphs, arrays)')
  .option('--dsalgo <dsalgo>', 'DS/Algo used (e.g. Queue, Recursion)')
  .option('--tag <tag...>', 'Tags')
  .option('--link <link>', 'Problem URL')
  .action(add);

// Add or update a short comment on a problem
program
  .command('comment <id> <text>')
  .description('Add or update a comment on a problem')
  .action(comment);

// Add or update the key takeaway / lesson learned for a problem
program
  .command('takeaway <id> <text>')
  .description('Add or update the takeaway for a problem')
  .action(takeaway);

// Interactively add an approach — opens editor for solution code
program
  .command('approach <id>')
  .description('Add an approach interactively (opens editor for solution)')
  .action(approach);

// Print full details of a single problem including approaches and takeaways
program
  .command('show <id>')
  .description('Show full details of a problem')
  .action(show);

// List all problems with optional filters — topic, difficulty, tag, search, sort
program
  .command('list')
  .description('List problems with optional filters')
  .option('--topic <topic>', 'Filter by topic')
  .option('--difficulty <difficulty>', 'Filter by difficulty (easy/medium/hard)')
  .option('--tag <tag>', 'Filter by tag')
  .option('--search <search>', 'Search by title')
  .option('--sort <sort>', 'Sort by: recent, difficulty, revisits')
  .action(list);

// Mark a problem as reviewed today — updates lastReviewed and increments revisitCount
program
  .command('revisit <id>')
  .description('Mark a problem as revisited today')
  .action(revisit);

// Show problems not reviewed within the last N days (spaced repetition reminders)
program
  .command('review')
  .description('Show problems not reviewed recently')
  .option('--days <days>', 'Days threshold (default: 7)', '7')
  .action(review);

// Show aggregate stats — total, by difficulty, by topic, by DS/algo, current streak
program
  .command('stats')
  .description('Show overall stats')
  .option('--topic <topic>', 'Stats for a specific topic')
  .action(stats);

// Show a learning digest for a topic — all approaches and takeaways grouped together
program
  .command('digest <topic>')
  .description('Show a learning digest for a topic')
  .option('--export', 'Export digest to a markdown file')
  .action(digest);

// Delete a problem from the store
program
  .command('delete <id>')
  .description('Delete a problem')
  .action(deleteCmd);

// Export all problems to a CSV file
program
  .command('export')
  .description('Export all problems to CSV')
  .option('--output <path>', 'Output file path')
  .action(exportCmd);

// Import problems from a CSV (Google Sheets export format)
program
  .command('import <file>')
  .description('Import problems from a CSV file (Google Sheets export)')
  .action(importCmd);

program.parse(process.argv);
