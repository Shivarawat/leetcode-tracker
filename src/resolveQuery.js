const inquirer = require('inquirer');
const { resolve } = require('./store');
const chalk = require('chalk');

// Resolves a user-supplied query (ID or partial name) to a single problem.
// If exactly one match is found — returns it directly.
// If multiple matches — shows an interactive list picker using Inquirer.js.
// If no matches — prints an error and returns null.
//
// This is the key function that makes all commands flexible:
// you can run `show 42` or `show "two sum"` and it just works.
const resolveQuery = async (query) => {
  const { problem, matches } = resolve(query);

  // Exact or unambiguous match — return immediately, no prompt needed
  if (problem) return problem;

  if (!matches.length) {
    console.log(chalk.red(`No problem found matching "${query}"`));
    return null;
  }

  // Multiple matches — pause execution and show interactive picker.
  // Inquirer.prompt is async; Commander has already parsed args by this point
  // so we can safely await here without interfering with other commands.
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
