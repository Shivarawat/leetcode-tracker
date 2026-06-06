const fs = require('fs');
const path = require('path');
const { getAll } = require('../store');
const chalk = require('chalk');

// Generates a learning digest for a topic — groups all takeaways, approaches, and stale problems together.
// Matches on topic, dsAlgo, or tags — so "graphs" finds problems tagged with BFS, DFS, etc.
// With --export flag, writes the digest to a markdown file (strips chalk color codes).
const digest = (topic, options) => {
  const all = getAll();
  const problems = all.filter((p) =>
    p.topic?.toLowerCase().includes(topic.toLowerCase()) ||
    p.dsAlgo?.toLowerCase().includes(topic.toLowerCase()) ||
    p.tags?.some((t) => t.toLowerCase().includes(topic.toLowerCase()))
  );

  if (!problems.length) {
    console.log(chalk.yellow(`\n  No problems found for topic "${topic}"\n`));
    return;
  }

  const lines = [];
  const log = (line = '') => { lines.push(line); console.log(line); };

  log(chalk.bold.cyan(`\n  ══ DIGEST: ${topic.toUpperCase()} ══`));
  log(`  ${problems.length} problem(s) found\n`);

  // Stats
  const byDiff = { easy: 0, medium: 0, hard: 0, unknown: 0 };
  problems.forEach((p) => { byDiff[p.difficulty?.toLowerCase() || 'unknown']++; });
  log(chalk.bold('  DIFFICULTY BREAKDOWN'));
  log(`  Easy: ${chalk.green(byDiff.easy)}  Medium: ${chalk.yellow(byDiff.medium)}  Hard: ${chalk.red(byDiff.hard)}`);

  // Takeaways
  const withTakeaway = problems.filter((p) => p.takeaway);
  if (withTakeaway.length) {
    log(chalk.bold('\n  TAKEAWAYS'));
    withTakeaway.forEach((p) => log(`  • ${chalk.yellow(p.takeaway)} ${chalk.gray(`(#${p.id} ${p.title})`)}`));
  }

  // Approaches used
  const approachMap = {};
  problems.forEach((p) => {
    p.approaches?.forEach((a) => {
      if (!approachMap[a.name]) approachMap[a.name] = { tc: a.timeComplexity, sc: a.spaceComplexity, problems: [] };
      approachMap[a.name].problems.push(`#${p.id}`);
    });
  });
  if (Object.keys(approachMap).length) {
    log(chalk.bold('\n  APPROACHES USED'));
    Object.entries(approachMap).forEach(([name, info]) => {
      log(`  • ${chalk.cyan(name)} — Time: ${chalk.green(info.tc || '?')} Space: ${chalk.green(info.sc || '?')} — used in ${info.problems.join(', ')}`);
    });
  }

  // Comments
  const withComment = problems.filter((p) => p.comment);
  if (withComment.length) {
    log(chalk.bold('\n  YOUR COMMENTS'));
    withComment.forEach((p) => log(`  • ${chalk.gray(`#${p.id} ${p.title}:`)} ${p.comment}`));
  }

  // Problems to revisit
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const toRevisit = problems.filter((p) => new Date(p.lastReviewed) < cutoff);
  if (toRevisit.length) {
    log(chalk.bold.yellow('\n  NEEDS REVISIT (7+ days)'));
    toRevisit.forEach((p) => {
      const days = Math.floor((Date.now() - new Date(p.lastReviewed)) / 86400000);
      const link = p.link ? ` — ${p.link}` : '';
      log(`  • #${p.id} ${chalk.white(p.title)} ${chalk.gray(`(${days} days ago)`)}${link}`);
    });
  }

  // All problems in topic
  log(chalk.bold('\n  ALL PROBLEMS'));
  problems.forEach((p) => {
    const link = p.link ? ` ${chalk.underline.blue(p.link)}` : '';
    log(`  • #${p.id} ${p.title} [${p.difficulty}]${link}`);
  });
  log();

  // Export to markdown
  if (options.export) {
    const md = lines.map((l) => l.replace(/\[[0-9;]*m/g, '')).join('\n');
    const file = path.join(process.cwd(), `digest-${topic}.md`);
    fs.writeFileSync(file, md);
    console.log(chalk.green(`✓ Exported to ${file}`));
  }
};

module.exports = digest;
