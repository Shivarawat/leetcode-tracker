const { getById, upsert } = require('../store');
const chalk = require('chalk');

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
