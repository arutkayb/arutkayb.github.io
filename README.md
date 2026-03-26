# arutkayb.github.io

Personal website built with [Astro](https://astro.build), hosted on GitHub Pages.

## Pages

- **Overview** — bio, alive projects, and the dream team
- **Blog** — latest Medium posts, auto-refreshed daily at 12:00 UTC via GitHub Actions
- **Diary** — daily reflections imported from the [dear-diary](https://github.com/arutkayb/agentic-files) workflow

---

## Diary

Diary entries live in `src/content/diary/` as Markdown files with YAML frontmatter. They are **not** written here directly — they come from the `dear-diary` project.

### How it works

1. Run `dear-diary` as usual — it writes a reflection to `~/workspace/dear-diary/reflections/YYYY-MM-DD.md`
2. Run the import script from this repo:

```bash
# Import a specific date
./scripts/import-diary.sh 2026-03-25

# Import all reflections at once
./scripts/import-diary.sh
```

3. Commit and push:

```bash
git add src/content/diary/
git commit -m "diary: add YYYY-MM-DD reflection"
git push
```

GitHub Actions picks up the push and deploys the updated site automatically.

### Diary entry format

The import script reads the reflection markdown and extracts:

| Frontmatter field | Source in reflection file |
|---|---|
| `title` | First `#` heading |
| `date` | Filename (`YYYY-MM-DD.md`) |
| `stats` | First bold line under `## Day Overview` (e.g. `94 sessions · 665 messages`) |
| `overview` | First prose paragraph under `## Day Overview` |

The rest of the markdown body is included as-is and rendered on the diary entry page.

---

## Development

```bash
npm install
npm run dev
```

## Deploy

Pushing to `master` triggers GitHub Actions to build and deploy to GitHub Pages automatically.
