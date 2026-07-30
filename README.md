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
| **Countries** | Individual countries, each with its own page |
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

### Countries, and how they mix with placeholders

Countries are being written one at a time, so a world's list is part real and
part placeholder. It works like this:

- Each group in **Worlds → Country groups** has a **Count**: how many countries
  that group has **in total**.
- The site fills that number with the **Countries** you've actually written
  first, and pads the rest with placeholders (`Country 1`, `Country 2`…).
- So writing a new country **does not** require changing Count. If Main
  Countries is `18` and you write one real country, you get 1 real + 17
  placeholders — still 18.

When adding a country in the **Countries** collection:

- **World** — whose page it appears on.
- **Group** — must be a group that exists in that world (Mobius has
  `main`/`secondary`/`territory`; Moebius and Sol only `main`; 200 Years Future
  has `safe`/`missing`). **If it doesn't match, the country silently won't
  show up.**
- **Flag** — shown inside the Basic Information box and on the world-page card.
  Without one, the card shows the country's first letter instead.
- **Background** — the full-page background of that country's own page.

### The quote (chat)

The top of a country's page can open with a short exchange between characters,
shown as a chat. Under **Quote (chat)** add one entry per message:

- **Character** — who's speaking.
- **Avatar** — their picture, shown as a small circle. Square images look best;
  without one, the character's initial is shown instead.
- **Message** — what they say.

Each character always stays on the same side of the chat, decided by the order
they first speak: the first one goes left, the second right, and so on. Leave
the whole thing empty and no chat box appears.

### Content blocks

The body of a country's page is a list of **Content blocks**, shown in the order
you add them and separated by a divider line. Each one has:

- **Title** — shown in a bordered bar with a circle on its left. It's also the
  entry in the Contents list.
- **Icon** — the image inside that circle. Square images look best; leave it
  empty and the circle stays blank.
- **Content** — the body, built out of **parts** (see below).

#### Building a block out of parts

A block's body isn't one big text field: you add **parts** one after another, and
each part has a type. When you click *Add* under **Content**, the CMS asks which
kind you want:

| Part type | What it gives you |
| --- | --- |
| **Text** | Just text. Leave a blank line between paragraphs. |
| **Text + image** | Text with an image beside it. **Image side** picks whether the image sits on the right (default) or the left. |
| **Image** | Just an image, filling the width. |
| **Regions** | A map of the country plus a set of regions, each with its own locations. |

**Text + image** and **Image** both take an optional **Caption**, shown under the
picture. On phones, a **Text + image** part stacks: text first, image underneath.

Parts appear in the order you add them, and you can mix as many as you like — a
block can be text, then text with a picture on the right, then a full-width
image, and so on. A **Text + image** part with no image just renders as text.

#### The Regions part

Use this for a country's regions. It holds:

- **Map of the country** and an optional **Map caption** — shown at the top.
- **Regions** — add one per region, each with a **Title**, a **Description**, and
  a list of **Locations**.
- Each **Location** has a **Name**, an **Image**, and an optional
  **Description**.

The locations show up as a row of pictures under the region's description. If
there are more than fit, the row scrolls sideways on its own — the page never
scrolls sideways with it.

**Give a location a Description and readers can click its picture to open it**,
showing the name and text underneath. Clicking another location switches to it;
clicking the open one again closes it. A location with no description isn't
clickable, so readers are never offered a click that does nothing. Each region
opens and closes independently.

The **Contents** list at the top is built automatically from the block titles,
so there's nothing to keep in sync: rename a block and the list follows. Blocks
with no title are skipped, and if two share a title the links still work.

### The Basic Information box

The box on the right of a country's page. It always shows the same five rows —
**Continent**, **Capital**, **Other Cities**, **Major Organizations**,
**Minor Organizations** — in that order, with the country's name as the heading
and the flag underneath.

- **Leave a row empty and it shows "N/A"** rather than disappearing, so the box
  looks the same on every country.
- **Other Cities** and the two **Organizations** rows are lists: click *Add* for
  each entry and it gets its own line.
- **Extra rows** lets you add anything the five fixed rows don't cover
  (*Figure Head*, *Population*, *Language*…). Each one needs a **Label** and a
  **Value**, and they appear at the bottom of the box in the order you add them.
  A row with no label is skipped.

Other fields in **Country groups** (Worlds):

- **Placeholder label** is the word used for the padding (`Country`,
  `Territory`…).
- **Label** is the heading shown above the group on the page.
- **ID** is used internally for links and image filenames — **don't change it**
  on existing groups, or you'll break links.

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

Countries are the one collection that isn't rendered straight from its files:
`src/data/worlds/index.js` merges `src/content/countries/*.json` into each
world by `world` + `group`, and pads each group with generated placeholders up
to its `count`, so written countries consume placeholder slots rather than
adding to them.

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
