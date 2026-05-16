const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { getById, upsert } = require('../store');
const chalk = require('chalk');

const importCmd = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`File not found: ${filePath}`));
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  let added = 0, skipped = 0, updated = 0;

  records.forEach((row) => {
    const id = String(row['S. No.'] ?? row['S.No.'] ?? row['id'] ?? '').trim();
    if (!id) { skipped++; return; }

    const title = (row['Problem Statement'] || row['title'] || '').trim();
    if (!title) { skipped++; return; }

    const approaches = [];
    const buildApproach = (nameSuffix, tcKey, scKey) => {
      const name = (row[`Approach ${nameSuffix}`] || '').trim();
      if (name) approaches.push({
        name,
        timeComplexity: (row[tcKey] || '').trim(),
        spaceComplexity: (row[scKey] || '').trim(),
        solution: '',
        note: '',
      });
    };

    buildApproach('1', 'TC', 'SC');
    buildApproach('2', 'TC2', 'SC2');
    buildApproach('3', 'TC3', 'SC3');

    const existing = getById(id);
    const problem = existing || {
      id,
      solvedAt: new Date().toISOString(),
      lastReviewed: new Date().toISOString(),
      revisitCount: 0,
    };

    problem.title = title;
    problem.link = (row['Question Link'] || '').trim();
    problem.topic = (row['Topic'] || '').trim();
    problem.dsAlgo = (row['DS / Algo Used'] || row['DS/Algo Used'] || '').trim();
    problem.difficulty = (row['Difficulty'] || 'unknown').trim().toLowerCase();
    problem.tags = problem.dsAlgo ? [problem.dsAlgo] : [];
    problem.takeaway = (row['Things to Remember'] || row['Things to remember'] || '').trim();
    problem.comment = problem.comment || '';
    problem.approaches = approaches.length ? approaches : (problem.approaches || []);

    upsert(problem);
    existing ? updated++ : added++;
  });

  console.log(chalk.green(`\n✓ Import complete: ${added} added, ${updated} updated, ${skipped} skipped\n`));
};

module.exports = importCmd;
