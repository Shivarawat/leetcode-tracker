const resolveQuery = require('../resolveQuery');
const { printProblem } = require('../display');

// Prints full details of a problem — resolves by ID or partial name, then calls printProblem
const show = async (query) => {
  const problem = await resolveQuery(query);
  if (problem) printProblem(problem);
};

module.exports = show;
