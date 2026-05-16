const fs = require('fs');
const path = require('path');
const { getAll } = require('../store');
const chalk = require('chalk');

const exportCmd = (options) => {
  const problems = getAll();
  if (!problems.length) { console.log(chalk.yellow('No problems to export.')); return; }

  const headers = ['id', 'title', 'difficulty', 'topic', 'dsAlgo', 'link', 'solvedAt', 'revisitCount', 'comment', 'takeaway',
    'approach1', 'tc1', 'sc1', 'approach2', 'tc2', 'sc2', 'approach3', 'tc3', 'sc3'];

  const rows = problems.map((p) => {
    const a = p.approaches || [];
    return [
      p.id, `"${p.title}"`, p.difficulty, p.topic, p.dsAlgo, p.link,
      p.solvedAt, p.revisitCount || 0,
      `"${(p.comment || '').replace(/"/g, '""')}"`,
      `"${(p.takeaway || '').replace(/"/g, '""')}"`,
      `"${a[0]?.name || ''}"`, a[0]?.timeComplexity || '', a[0]?.spaceComplexity || '',
      `"${a[1]?.name || ''}"`, a[1]?.timeComplexity || '', a[1]?.spaceComplexity || '',
      `"${a[2]?.name || ''}"`, a[2]?.timeComplexity || '', a[2]?.spaceComplexity || '',
    ];
  });

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const file = options.output || path.join(process.cwd(), 'leetcode-export.csv');
  fs.writeFileSync(file, csv);
  console.log(chalk.green(`✓ Exported ${problems.length} problems to ${file}`));
};

module.exports = exportCmd;
