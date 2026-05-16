const inquirer = require('inquirer');
const { resolve } = require('./store');
const chalk = require('chalk');

// Resolves a query (ID or name) to a single problem.
// If ambiguous, prompts user to pick from matches.
const resolveQuery = async (query) => {
  const { problem, matches } = resolve(query);

  if (problem) return problem;

  if (!matches.length) {
    console.log(chalk.red(`No problem found matching "${query}"`));
    return null;
  }

  // Multiple matches — let user pick
  const { chosen } = await inquirer.prompt([{
    type: 'list',
    name: 'chosen',
    message: `Multiple matches for "${query}". Pick one:`,
    choices: matches.map((p) => ({
      name: `#${p.id} — ${p.title} [${p.difficulty}]`,
      value: p,
    })),
  }]);

  return chosen;
};

module.exports = resolveQuery;
