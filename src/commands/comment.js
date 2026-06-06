const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

// Adds or replaces the comment on a problem — overwrites any existing comment
const comment = async (query, text) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  problem.comment = text;
  upsert(problem);
  console.log(chalk.green(`✓ Comment updated for #${problem.id} — ${problem.title}`));
};

module.exports = comment;
