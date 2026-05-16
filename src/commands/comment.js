const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

const comment = async (query, text) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  problem.comment = text;
  upsert(problem);
  console.log(chalk.green(`✓ Comment updated for #${problem.id} — ${problem.title}`));
};

module.exports = comment;
