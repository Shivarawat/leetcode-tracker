const inquirer = require('inquirer');
const resolveQuery = require('../resolveQuery');
const { upsert } = require('../store');
const chalk = require('chalk');

const approach = async (query) => {
  const problem = await resolveQuery(query);
  if (!problem) return;

  console.log(chalk.cyan(`\nAdding approach for #${problem.id} — ${problem.title}`));

  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Approach name:', validate: (v) => v.trim() ? true : 'Required' },
    { type: 'input', name: 'timeComplexity', message: 'Time complexity (e.g. O(n)):' },
    { type: 'input', name: 'spaceComplexity', message: 'Space complexity (e.g. O(1)):' },
    { type: 'editor', name: 'solution', message: 'Solution (opens editor):' },
    { type: 'input', name: 'note', message: 'Note (optional):' },
  ]);

  problem.approaches = problem.approaches || [];
  problem.approaches.push({
    name: answers.name,
    timeComplexity: answers.timeComplexity,
    spaceComplexity: answers.spaceComplexity,
    solution: answers.solution.trim(),
    note: answers.note,
  });

  upsert(problem);
  console.log(chalk.green(`✓ Approach "${answers.name}" added to #${problem.id}`));
};

module.exports = approach;
