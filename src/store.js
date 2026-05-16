const fs = require('fs');
const path = require('path');
const os = require('os');

const DATA_DIR = path.join(os.homedir(), '.leetcode-tracker');
const DATA_FILE = path.join(DATA_DIR, 'data.json');

const load = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ problems: [] }, null, 2));
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

const save = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const getAll = () => load().problems;

const getById = (id) => load().problems.find((p) => String(p.id) === String(id));

// Resolves by exact ID or case-insensitive partial title match
// Returns { problem, matches } — matches has >1 items when ambiguous
const resolve = (query) => {
  const problems = load().problems;
  const byId = problems.find((p) => String(p.id) === String(query));
  if (byId) return { problem: byId, matches: [byId] };
  const matches = problems.filter((p) =>
    p.title?.toLowerCase().includes(String(query).toLowerCase())
  );
  if (matches.length === 1) return { problem: matches[0], matches };
  return { problem: null, matches };
};

const upsert = (problem) => {
  const data = load();
  const idx = data.problems.findIndex((p) => String(p.id) === String(problem.id));
  if (idx >= 0) data.problems[idx] = problem;
  else data.problems.push(problem);
  save(data);
};

const remove = (id) => {
  const data = load();
  data.problems = data.problems.filter((p) => String(p.id) !== String(id));
  save(data);
};

module.exports = { getAll, getById, resolve, upsert, remove };
