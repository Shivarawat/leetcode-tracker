const resolveQuery = require('../resolveQuery');
const { remove } = require('../store');
const chalk = require('chalk');

const deleteCmd = async (query) => {
  const problem = await resolveQuery(query);
  if (!problem) return;
  remove(problem.id);
  console.log(chalk.green(`✓ Deleted #${problem.id} — ${problem.title}`));
};

module.exports = deleteCmd;
