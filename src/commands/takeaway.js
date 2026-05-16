const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

const takeaway = async (query, text) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  problem.takeaway = text;
  upsert(problem);
  console.log(chalk.green(`✓ Takeaway updated for #${problem.id} — ${problem.title}`));
};

module.exports = takeaway;
