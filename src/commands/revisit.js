const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

// Marks a problem as reviewed today — updates lastReviewed timestamp and increments revisitCount.
// lastReviewed is used by the `review` command to surface problems that haven't been seen recently.
// This is the spaced repetition mechanism — run `review` to find stale problems, then `revisit` to reset the clock.
const revisit = async (query) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  problem.lastReviewed = new Date().toISOString();
  problem.revisitCount = (problem.revisitCount || 0) + 1;
  upsert(problem);
  console.log(chalk.green(`✓ Marked #${problem.id} — ${problem.title} as revisited (total: ${problem.revisitCount})`));
};

module.exports = revisit;
