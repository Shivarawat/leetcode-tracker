const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

const revisit = async (query) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  problem.lastReviewed = new Date().toISOString();
  problem.revisitCount = (problem.revisitCount || 0) + 1;
  upsert(problem);
  console.log(chalk.green(`✓ Marked #${problem.id} — ${problem.title} as revisited (total: ${problem.revisitCount})`));
};

module.exports = revisit;
