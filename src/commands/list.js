const { getAll } = require('../store');
const { printRow, diffColor } = require('../display');
const chalk = require('chalk');

const list = (options) => {
  let problems = getAll();

  if (!problems.length) { console.log(chalk.yellow('No problems tracked yet.')); return; }

  if (options.topic) problems = problems.filter((p) => p.topic?.toLowerCase().includes(options.topic.toLowerCase()));
  if (options.difficulty) problems = problems.filter((p) => p.difficulty?.toLowerCase() === options.difficulty.toLowerCase());
  if (options.tag) problems = problems.filter((p) => p.tags?.some((t) => t.toLowerCase().includes(options.tag.toLowerCase())));
  if (options.search) problems = problems.filter((p) => p.title?.toLowerCase().includes(options.search.toLowerCase()));

  if (options.sort === 'recent') problems.sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt));
  else if (options.sort === 'difficulty') problems.sort((a, b) => ['easy','medium','hard'].indexOf(a.difficulty) - ['easy','medium','hard'].indexOf(b.difficulty));
  else if (options.sort === 'revisits') problems.sort((a, b) => (b.revisitCount || 0) - (a.revisitCount || 0));

  console.log(chalk.bold(`\n  Found ${problems.length} problem(s)\n`));
  console.log(`  ${'ID'.padEnd(6)} ${'Title'.padEnd(40)} ${'Diff'.padEnd(7)} ${'Topic'.padEnd(15)} ${'Solved'.padEnd(12)} Revisits`);
  console.log('  ' + '─'.repeat(95));
  problems.forEach(printRow);
  console.log();
};

module.exports = list;
