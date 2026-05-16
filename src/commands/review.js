const { getAll } = require('../store');
const { printRow } = require('../display');
const chalk = require('chalk');

const review = (options) => {
  const days = parseInt(options.days || 7);
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const problems = getAll().filter((p) => new Date(p.lastReviewed) < cutoff);

  if (!problems.length) {
    console.log(chalk.green(`\n  ✓ No problems to review (all reviewed within ${days} days)\n`));
    return;
  }

  console.log(chalk.bold.yellow(`\n  ${problems.length} problem(s) not reviewed in ${days}+ days\n`));
  console.log(`  ${'ID'.padEnd(6)} ${'Title'.padEnd(40)} ${'Diff'.padEnd(7)} ${'Topic'.padEnd(15)} ${'Solved'.padEnd(12)} Revisits`);
  console.log('  ' + '─'.repeat(95));
  problems
    .sort((a, b) => new Date(a.lastReviewed) - new Date(b.lastReviewed))
    .forEach(printRow);
  console.log();
};

module.exports = review;
