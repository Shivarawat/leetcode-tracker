const { getAll } = require('../store');
const chalk = require('chalk');

const stats = (options) => {
  let problems = getAll();
  if (!problems.length) { console.log(chalk.yellow('No problems tracked yet.')); return; }

  if (options.topic) problems = problems.filter((p) => p.topic?.toLowerCase().includes(options.topic.toLowerCase()));

  const total = problems.length;
  const byDiff = { easy: 0, medium: 0, hard: 0, unknown: 0 };
  problems.forEach((p) => { byDiff[p.difficulty?.toLowerCase() || 'unknown']++; });

  // Count by topic
  const byTopic = {};
  problems.forEach((p) => {
    const t = p.topic || 'uncategorized';
    byTopic[t] = (byTopic[t] || 0) + 1;
  });

  // Count by dsAlgo
  const byAlgo = {};
  problems.forEach((p) => {
    const a = p.dsAlgo || 'unknown';
    byAlgo[a] = (byAlgo[a] || 0) + 1;
  });

  // Streak calculation
  const today = new Date(); today.setHours(0,0,0,0);
  const dates = [...new Set(problems.map((p) => {
    const d = new Date(p.solvedAt); d.setHours(0,0,0,0); return d.getTime();
  }))].sort((a, b) => b - a);

  let streak = 0;
  let current = today.getTime();
  for (const date of dates) {
    if (date === current || date === current - 86400000) {
      streak++;
      current = date - 86400000;
    } else break;
  }

  console.log(chalk.bold.cyan('\n  ── Stats' + (options.topic ? ` for "${options.topic}"` : '') + ' ──\n'));
  console.log(`  Total Problems : ${chalk.bold(total)}`);
  console.log(`  Easy           : ${chalk.green(byDiff.easy)}`);
  console.log(`  Medium         : ${chalk.yellow(byDiff.medium)}`);
  console.log(`  Hard           : ${chalk.red(byDiff.hard)}`);
  console.log(`  Current Streak : ${chalk.bold.magenta(streak + ' day(s)')}`);

  console.log(chalk.bold('\n  By Topic:'));
  Object.entries(byTopic).sort((a, b) => b[1] - a[1]).forEach(([t, c]) => {
    console.log(`    ${chalk.magenta(t.padEnd(20))} ${c}`);
  });

  console.log(chalk.bold('\n  By DS/Algo:'));
  Object.entries(byAlgo).sort((a, b) => b[1] - a[1]).forEach(([a, c]) => {
    console.log(`    ${chalk.blue(a.padEnd(20))} ${c}`);
  });
  console.log();
};

module.exports = stats;
