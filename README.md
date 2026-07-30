# PU-Web — RP Lore Archive

A lore wiki for our RP setting (worlds, gods, energies, species, factions and
more), built with React + Vite and published on GitHub Pages.

**Live site:** https://amaranthw21.github.io/PU-Web/
**Editing panel:** https://amaranthw21.github.io/PU-Web/admin/

---

# Editors' guide (for moderators)

**You do not need to know how to code.** Everything on the site is edited
through a form-based panel. You never touch code, JSON or Git.

## What you need once, before you start

1. A **GitHub account** — free, takes two minutes: https://github.com/signup
2. An **invitation to the repository**, which the site owner sends you. Check
   your email (or https://github.com/notifications) and click **Accept
   invitation**. Without this you can log in but not save.

## How to edit

1. Click **Admin** in the top navigation bar of the site — or go straight to
   **https://amaranthw21.github.io/PU-Web/admin/**
2. Click **Sign In with GitHub** and authorise the app (only the first time).
3. Pick a collection in the left sidebar (Species, Gods, Worlds…).
4. Click an existing entry to edit it, or **New <item>** to create one.
5. Fill in the fields, then click **Publish**.

That's it. Your change is saved and the live site rebuilds itself in about
**one to two minutes**. Refresh the page to see it.

> ⚠️ **If the site looks blank or broken right after someone publishes**, it is
> almost certainly your browser holding an old cached version — not something
> you broke. Press **Cmd + Shift + R** (Mac) or **Ctrl + Shift + R**
> (Windows) to force a reload. It also fixes itself after ~10 minutes.

## The collections

| Collection | What it holds |
| --- | --- |
| **Species** | The playable/known species |
| **Factions** | Faction hubs, one per world |
| **Gods** | Deities, grouped by category (mobius / moebius / sol / other) |
| **Energies** | Energy types, including player-made ones |
| **Powers** | Power categories |
| **Transformations** | Transformation categories |
| **Worlds** | The main worlds, each with its own page and map |
| **Side worlds** | Secondary dimensions (button only, no page) |
| **Lore (sections)** | The index of sections on the Lore page |

## Fields you'll see, in plain terms

- **Order** — a number that decides the position in the list. Lower numbers come
  first. If you want a new entry to appear third, give it `3`; you may need to
  bump the ones after it.
- **Name / Title** — the display name. Also used to name the file, so avoid
  renaming things you don't have to.
- **Summary** — the short text shown on cards and previews.
- **Description** — the long text on the detail page.
- **Image / Icon / Background / Map** — click the field, then drag a file in or
  pick one already uploaded. Each collection puts its images in the right
  folder automatically.
- **Image position** — only if a picture is badly framed. It's a CSS value like
  `center`, `30% center` or `center 85%`. First number is horizontal, second is
  vertical. Leave it empty for centred.
- **Image zoom / Background zoom** — a multiplier such as `1.2` to crop in a
  little. Leave empty for none.
- **Accent color** — a colour picker, used for that entry's highlight colour.
- **Group / Category** — which section the entry belongs to. For Gods and
  Factions this is a dropdown, so just pick one.

### Country groups (Worlds only)

A world's countries are **not written one by one yet**. Instead each group has a
**Count**, and the site auto-generates that many placeholder countries
(`Country 1`, `Country 2`…). So:

- Changing **Count** from `3` to `5` adds two more placeholder countries.
- The **Placeholder label** is the word used for them (`Country`, `Territory`…).
- **Label** is the heading shown above the group on the page.
- **ID** is used internally for links and image filenames — **don't change it**
  on existing groups, or you'll break links.

Real, individually written countries will get their own collection later.

## Good habits

- **Publish one entry at a time.** Each publish is a separate save.
- **Don't rename the ID fields** on existing entries.
- **Images:** use reasonably sized files (a few hundred KB is plenty). Huge
  images make the site slow for everyone.
- **If something looks wrong after saving,** try the hard reload above first.
  Nothing is ever lost — every change is recorded and can be undone by the
  owner.

---

# Developer notes

## Running locally

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## How content works

Content lives as **one JSON file per entry** under `src/content/<collection>/`.
The modules in `src/data/` pick them up with `import.meta.glob` and sort them by
the `order` field, so adding a file is enough to add an entry — no imports to
update. This is exactly the shape the CMS writes, so hand-edits and CMS edits
are interchangeable.

Images live in `public/<collection>/` and are referenced by absolute path
(`/gods/argus.png`). Because the site is served from a subpath on GitHub Pages,
those paths are prefixed at runtime by the `asset()` helper in
`src/lib/asset.js` — use it for any new content-driven image.

## The editing panel

`public/admin/` holds the [Sveltia CMS](https://github.com/sveltia/sveltia-cms)
panel: `index.html` loads it from a CDN, and `config.yml` defines the GitHub
backend plus one collection per content type.

Login goes through a **Cloudflare Worker** running
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), which holds the
GitHub OAuth App credentials (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`) and an
`ALLOWED_DOMAINS` allowlist. Its URL is set as `base_url` under `backend` in
`config.yml`.

Note that Sveltia ignores the Decap-only `local_backend` and `locale` options.
To edit locally, open `/admin/` on localhost and use **Work with Local
Repository**, which only appears there.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main` — including the commits the CMS makes. Vite's `base` is
`/PU-Web/` in builds only; `public/404.html` plus the decoder in `index.html`
handle SPA routing on Pages.

Because each build renames the hashed asset bundles and drops the old ones, a
browser holding a stale `index.html` will request a deleted JS file and get a
404 until it reloads. That's the cause of the blank page mentioned above, and a
hard reload is the fix.
