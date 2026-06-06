const fs = require('fs');
const path = require('path');
const os = require('os');

// All data is stored in ~/.leetcode-tracker/data.json on the user's machine.
// No database — just a local JSON file. Simple and portable.
const DATA_DIR = path.join(os.homedir(), '.leetcode-tracker');
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// Reads the JSON file from disk. Creates the file and directory if they don't exist yet.
const load = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ problems: [] }, null, 2));
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

// Writes the full data object back to disk — overwrites the file every time
const save = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Returns all problems as an array
const getAll = () => load().problems;

// Finds a problem by exact numeric ID
const getById = (id) => load().problems.find((p) => String(p.id) === String(id));

// Resolves a query (ID or partial title) to a problem or list of matches.
// Used by commands that accept either an ID or a name as input.
// Returns { problem, matches }:
//   - problem is set if exactly one match found
//   - matches has >1 items when the query is ambiguous (caller handles the picker)
const resolve = (query) => {
  const problems = load().problems;

  // Try exact ID match first
  const byId = problems.find((p) => String(p.id) === String(query));
  if (byId) return { problem: byId, matches: [byId] };

  // Fall back to case-insensitive partial title match
  const matches = problems.filter((p) =>
    p.title?.toLowerCase().includes(String(query).toLowerCase())
  );
  if (matches.length === 1) return { problem: matches[0], matches };

  // Ambiguous — return all matches, let caller show a picker
  return { problem: null, matches };
};

// Inserts a new problem or updates an existing one (matched by id)
const upsert = (problem) => {
  const data = load();
  const idx = data.problems.findIndex((p) => String(p.id) === String(problem.id));
  if (idx >= 0) data.problems[idx] = problem;
  else data.problems.push(problem);
  save(data);
};

// Removes a problem by id
const remove = (id) => {
  const data = load();
  data.problems = data.problems.filter((p) => String(p.id) !== String(id));
  save(data);
};

module.exports = { getAll, getById, resolve, upsert, remove };
