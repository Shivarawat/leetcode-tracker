const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

// Adds or replaces the key takeaway / lesson learned for a problem — overwrites any existing takeaway
const takeaway = async (query, text) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  problem.takeaway = text;
  upsert(problem);
  console.log(chalk.green(`✓ Takeaway updated for #${problem.id} — ${problem.title}`));
};

module.exports = takeaway;
