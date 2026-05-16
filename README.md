# lct — LeetCode/DSA Tracker CLI

A personal command-line tool to track DSA problems with approaches, time/space complexity, takeaways, and topic digests. Built for engineers who want a searchable notebook of everything they've solved.

## Install

```bash
npm install -g leetcode-tracker
```

Or clone and install locally:

```bash
git clone https://github.com/Shivarawat/leetcode-tracker
cd leetcode-tracker
npm install -g .
```

## Usage

All commands work with either a problem **ID** or a **partial name** (case-insensitive). If multiple problems match, an interactive picker appears.

### Add a problem

```bash
lct add 1 "Two Sum" easy --topic arrays --dsalgo "HashMap" --link "https://leetcode.com/problems/two-sum"
```

### Show full details

```bash
lct show 1
lct show "two sum"
```

### Add an approach (interactive)

```bash
lct approach "two sum"
# Prompts for: name, time complexity, space complexity, solution, note
```

### Add a comment

```bash
lct comment "two sum" "Classic HashMap problem, pattern repeats everywhere"
```

### Add a takeaway

```bash
lct takeaway "two sum" "Whenever you need O(n) lookup, think HashMap"
```

### Mark as revisited

```bash
lct revisit "two sum"
```

### List problems

```bash
lct list                          # all problems
lct list --topic graphs           # filter by topic
lct list --difficulty medium      # filter by difficulty
lct list --search "cycle"         # search by title
lct list --sort recent            # sort by date solved
lct list --sort difficulty        # sort easy → hard
lct list --sort revisits          # sort by revisit count
```

### Review problems not revisited recently

```bash
lct review                # problems not reviewed in 7+ days
lct review --days 3       # custom threshold
```

### Stats

```bash
lct stats                 # overall stats + streak
lct stats --topic graphs  # stats for a specific topic
```

### Topic digest

Aggregates all takeaways, approaches, and comments for a topic into one view.

```bash
lct digest graphs
lct digest graphs --export   # saves to digest-graphs.md
```

### Delete a problem

```bash
lct delete "two sum"
```

### Export to CSV

```bash
lct export
lct export --output ~/Desktop/my-problems.csv
```

### Import from Google Sheets

Export your sheet as CSV (File → Download → CSV) and run:

```bash
lct import ~/Downloads/my-sheet.csv
```

Expected columns:
```
S. No. | Question Link | Problem Statement | Topic | DS / Algo Used |
Difficulty | Approach 1 | TC | SC | Approach 2 | TC2 | SC2 |
Approach 3 | TC3 | SC3 | Things to Remember
```

Approach 2, Approach 3 columns are optional — blank cells are skipped.

## Data storage

All data is stored locally at `~/.leetcode-tracker/data.json`. No account or internet connection required.

## Tech Stack

- **Node.js** — runtime
- **Commander.js** — CLI framework
- **Inquirer.js** — interactive prompts
- **Chalk** — terminal colors
- **csv-parse** — CSV import

## License

MIT
