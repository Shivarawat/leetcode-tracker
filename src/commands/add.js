const { getById, upsert } = require('../store');
const chalk = require('chalk');

// Creates a new problem entry in the local JSON store.
// Prevents duplicates — if the ID already exists, tells the user which command to use instead.
// All fields default to empty/zero; approaches are added separately via the `approach` command.
const add = (id, title, difficulty, options) => {
  if (getById(id)) {
    console.log(chalk.yellow(`Problem #${id} already exists. Use 'comment', 'approach', or 'takeaway' to update it.`));
    return;
  }
  const problem = {
    id: String(id),
    title,
    difficulty: difficulty?.toLowerCase() || 'unknown',
    topic: options.topic || '',
    dsAlgo: options.dsalgo || '',
    tags: options.tag ? (Array.isArray(options.tag) ? options.tag : [options.tag]) : [],
    link: options.link || '',
    comment: '',
    takeaway: '',
    approaches: [],
    solvedAt: new Date().toISOString(),
    lastReviewed: new Date().toISOString(),
    revisitCount: 0,
  };
  upsert(problem);
  console.log(chalk.green(`✓ Added #${id} — ${title} (${problem.difficulty})`));
};

module.exports = add;
