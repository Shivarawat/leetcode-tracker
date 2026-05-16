const chalk = require('chalk');

const DIFFICULTY_COLOR = {
  easy: chalk.green,
  medium: chalk.yellow,
  hard: chalk.red,
  unknown: chalk.gray,
};

const diffColor = (d) => (DIFFICULTY_COLOR[d?.toLowerCase()] || chalk.gray)(d || 'unknown');

const printProblem = (p) => {
  console.log('\n' + chalk.bold.cyan(`#${p.id} — ${p.title}`));
  console.log(`  Difficulty : ${diffColor(p.difficulty)}`);
  console.log(`  Topic      : ${chalk.magenta(p.topic || '—')}`);
  console.log(`  DS/Algo    : ${chalk.magenta(p.dsAlgo || '—')}`);
  console.log(`  Tags       : ${p.tags?.length ? chalk.blue(p.tags.join(', ')) : '—'}`);
  if (p.link) console.log(`  Link       : ${chalk.underline.blue(p.link)}`);
  console.log(`  Solved     : ${chalk.gray(new Date(p.solvedAt).toLocaleDateString())}`);
  console.log(`  Revisits   : ${chalk.gray(p.revisitCount || 0)}`);

  if (p.comment) console.log(`\n  ${chalk.bold('Comment')}\n  ${chalk.white(p.comment)}`);
  if (p.takeaway) console.log(`\n  ${chalk.bold('Takeaway')}\n  ${chalk.yellow(p.takeaway)}`);

  if (p.approaches?.length) {
    console.log(`\n  ${chalk.bold('Approaches')}`);
    p.approaches.forEach((a, i) => {
      console.log(`\n  ${chalk.cyan(`${i + 1}. ${a.name}`)}`);
      if (a.timeComplexity) console.log(`     Time  : ${chalk.green(a.timeComplexity)}`);
      if (a.spaceComplexity) console.log(`     Space : ${chalk.green(a.spaceComplexity)}`);
      if (a.solution) console.log(`     Solution:\n     ${chalk.white(a.solution.split('\n').join('\n     '))}`);
      if (a.note) console.log(`     Note  : ${chalk.gray(a.note)}`);
    });
  }
  console.log();
};

const printRow = (p) => {
  const title = p.title.length > 40 ? p.title.slice(0, 37) + '...' : p.title.padEnd(40);
  const diff = diffColor((p.difficulty || 'unknown').padEnd(7));
  const topic = chalk.magenta((p.topic || '—').padEnd(15));
  const date = chalk.gray(new Date(p.solvedAt).toLocaleDateString().padEnd(12));
  const revisits = chalk.gray(`revisits: ${p.revisitCount || 0}`);
  console.log(`  ${chalk.cyan(String(p.id).padEnd(6))} ${title} ${diff} ${topic} ${date} ${revisits}`);
};

module.exports = { printProblem, printRow, diffColor };
