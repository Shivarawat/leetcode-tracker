const resolveQuery = require('../resolveQuery');
const { printProblem } = require('../display');

const show = async (query) => {
  const problem = await resolveQuery(query);
  if (problem) printProblem(problem);
};

module.exports = show;
