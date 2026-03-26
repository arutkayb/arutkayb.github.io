#!/bin/bash
# Import diary entries from dear-diary reflections into Astro content collection.
# Usage:
#   ./scripts/import-diary.sh                  # Import all reflections
#   ./scripts/import-diary.sh 2026-03-25       # Import a specific date

DEAR_DIARY_PATH="${DEAR_DIARY_DIR:-$HOME/workspace/dear-diary/reflections}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEBSITE_DIARY_PATH="$SCRIPT_DIR/../src/content/diary"

import_file() {
  local src="$1"
  local filename
  filename=$(basename "$src")
  local date="${filename%.md}"
  local dest="$WEBSITE_DIARY_PATH/$filename"

  if [ ! -f "$src" ]; then
    echo "File not found: $src"
    return 1
  fi

  # Extract title from first line (# Daily Reflection — YYYY-MM-DD)
  local title
  title=$(head -1 "$src" | sed 's/^# //')

  # Extract stats line (bold line with "sessions" keyword)
  local stats
  stats=$(grep -m1 '^\*\*.*sessions.*\*\*$' "$src" | sed 's/\*\*//g')

  # Extract overview: first non-empty, non-bold paragraph after "## Day Overview"
  local overview
  overview=$(awk '/^## Day Overview/{found=1; next}
    found && /^\*\*/{next}
    found && /^$/{next}
    found && /^##/{exit}
    found && /^---/{exit}
    found && /./{print; exit}' "$src")

  # Escape double quotes in overview
  overview=$(echo "$overview" | sed 's/"/\\"/g')

  # Write frontmatter + body (skip the H1 title line)
  {
    echo "---"
    echo "title: \"$title\""
    echo "date: $date"
    echo "overview: \"$overview\""
    [ -n "$stats" ] && echo "stats: \"$stats\""
    echo "---"
    echo ""
    tail -n +2 "$src"
  } > "$dest"

  echo "Imported: $filename"
}

mkdir -p "$WEBSITE_DIARY_PATH"

if [ -n "$1" ]; then
  import_file "$DEAR_DIARY_PATH/$1.md"
else
  count=0
  for f in "$DEAR_DIARY_PATH"/*.md; do
    [ -f "$f" ] && import_file "$f" && count=$((count + 1))
  done
  echo "Done. Imported $count entries."
fi
