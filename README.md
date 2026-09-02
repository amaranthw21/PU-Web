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

1. Click **Admin** — top right on a computer, at the bottom of the ☰ menu on a
   phone — or go straight to
   **https://amaranthw21.github.io/PU-Web/admin/**
2. Click **Sign In with GitHub** and authorise the app (only the first time).
3. Pick a collection in the panel's own left sidebar (Species, Gods, Worlds…).
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
| **Faction hubs** | The faction hubs, one per world (button, intro and groups) |
| **Factions** | Individual factions, each with its own page |
| **Gods** | Deities, grouped by category (mobius / moebius / sol / other) |
| **Energies** | Energy types, including player-made ones |
| **Powers** | Power categories, including player-made ones |
| **Transformations** | Transformation categories, including player-made ones |
| **Worlds** | The main worlds, each with its own page and map |
| **Countries** | Individual countries, each with its own page |
| **Side worlds** | Secondary dimensions (button only, no page) |
| **Lore (sections)** | The index of sections on the Lore page |
| **Rulesbook** | The server rules, one chapter per entry |

## Fields you'll see, in plain terms

- **Order** — a number that decides the position in the list. Lower numbers come
  first. If you want a new entry to appear third, give it `3`; you may need to
  bump the ones after it.
- **Name / Title** — the display name. Also used to name the file, so avoid
  renaming things you don't have to.
- **Summary** — the short text shown on cards, previews and inside the
  accordions.
- **Description** — the long text on the entry's own page, shown as the intro
  above the sections.
- **Image / Icon / Background / Map** — click the field, then drag a file in or
  pick one already uploaded. Each collection puts its images in the right
  folder automatically.
- **Image position** — only if a picture is badly framed. It's a CSS value like
  `center`, `30% center` or `center 85%`. First number is horizontal, second is
  vertical. Leave it empty for centred.
- **Image zoom / Background zoom** — a multiplier such as `1.2` to crop in a
  little. Leave empty for none.
- **Accent color** — a colour picker (**Gods**, **Countries** and **Factions**).
  It tints that entry's page: the frame, the title and the Basic Information box.
  Leave it empty and the page keeps the site's magenta.
- **Group / Category** — which section the entry belongs to. For Gods, Countries
  and Factions this is a dropdown, so just pick one.

> **Paragraphs:** any long text box splits into paragraphs wherever you leave a
> **blank line** between them. This works everywhere — summaries, descriptions,
> the text inside blocks, region descriptions, world presentations and the rows
> of the Basic Information box. Single line breaks are ignored, so leave an
> empty line to start a new paragraph.

## How an entry's page is built

Countries, Factions, Gods, Energies, Powers and Transformations all build their
own page the same way, so learning it once is enough:

1. an optional **Quote (chat)** at the top,
2. the **Description** as the intro,
3. a **Contents** list, built automatically,
4. the **Content blocks**, one after another.

**Countries, Factions and Gods** also get a **Basic Information** box on the
right. Energies, Powers and Transformations don't — their sections run the full
width. Countries and Factions are the exception to step 2: they have no
Description field, so their page opens straight into the quote and the blocks.

Everything here is optional. Leave the quote empty and no chat appears; add no
blocks and the Contents list stays hidden.

## Countries, and how they mix with placeholders

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

The other fields of a group, in **Worlds → Country groups**:

- **Placeholder label** is the word used for the padding (`Country`,
  `Territory`…).
- **Label** is the heading shown above the group on the page.
- **ID** is used internally for links and image filenames — **don't change it**
  on existing groups, or you'll break links.

## Factions

Factions work exactly like countries, one level down: **Faction hubs** are the
containers (the buttons on the Factions page, each with its **Presentation**,
its **Faction subgroups** and their **Count**), and the **Factions** collection
holds the ones written for real, each with its own page.

A hub's **Presentation** is the intro at the top of its page, same as a world's.
Leave it empty and no intro box appears at all.

- **Faction hub** — whose page it appears on.
- **Group** — must be a subgroup that exists in that hub (`main`, `side` or
  `custom`). **If it doesn't match, the faction silently won't show up.**
- **Emblem / logo** — shown inside the Basic Information box and on the
  hub-page card.
- **Background** — the full-page background of that faction's own page.

The padding works the same as with countries: written factions consume
placeholder slots, so a `Count` of 24 with one real faction gives 1 real + 23
placeholders.

A faction's page is built exactly like a country's — quote, Basic Information,
content blocks — with one difference: **its last section lists characters
instead of locations** (see *The Characters part* below).

## The quote (chat)

The top of an entry's page can open with a short exchange between characters,
shown as a chat. Under **Quote (chat)** add one entry per message:

- **Character** — who's speaking.
- **Avatar** — their picture, shown as a small circle. Square images look best;
  without one, the character's initial is shown instead.
- **Message** — what they say.

Each character always stays on the same side of the chat, decided by the order
they first speak: the first one goes left, the second right, and so on. Leave
the whole thing empty and no chat box appears.

## Content blocks

The body of an entry's page is a list of **Content blocks**, shown in the order
you add them and separated by a divider line. Each one has:

- **Title** — shown in a bordered bar with a circle on its left. It's also the
  entry in the Contents list.
- **Icon** — the image inside that circle. Square images look best; leave it
  empty and the circle stays blank.
- **Content** — the body, built out of **parts** (see below).

### Building a block out of parts

A block's body isn't one big text field: you add **parts** one after another, and
each part has a type. When you click *Add* under **Content**, the CMS asks which
kind you want:

| Part type | What it gives you |
| --- | --- |
| **Text** | Text, with an optional **heading** above it. Leave a blank line between paragraphs. |
| **Text + image** | The same, with an image beside it. The heading stays with the text, so the picture sits next to the whole section. **Image side** picks whether the image sits on the right (default) or the left. |
| **Image** | Just an image, filling the width. |
| **Regions** | A map of the country plus a set of regions, each with its own locations. **Countries only.** |
| **Characters** | The same thing for a faction: groups of characters instead of regions of locations. **Factions only.** |

**Text + image** and **Image** both take an optional **Caption**, shown under the
picture. On phones, a **Text + image** part stacks: text first, image underneath.

Parts appear in the order you add them, and you can mix as many as you like — a
block can be text, then text with a picture on the right, then a full-width
image, and so on. A **Text + image** part with no image just renders as text.

The **heading** is what turns a part into a named section inside the block — like
*Innate Powers* on the Powers page. Leave it empty and you get a plain paragraph,
exactly as before. A block can hold several of them, so one block can cover
several named points instead of needing one block each.

Headings are plain text: **bold or italics inside a paragraph aren't supported
anywhere on the site yet.** If you need a word emphasised mid-sentence, tell the
owner — it's a separate change.

### The Regions part

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

### The Characters part

The faction equivalent of *Regions*, and it behaves identically — same rows of
pictures, same click-to-open panel. Only the names change:

- **Group picture** and an optional **Caption** — shown at the top of the
  section, where a country's map goes. Leave it empty and nothing appears.
- **Character groups** — add one per group, e.g. *Leaders* or *Members*, each
  with a **Title**, a **Description** and a list of **Characters**.
- Each **Character** has a **Name**, an **Image**, and an optional
  **Description** that opens when the picture is clicked.

A group with no title and no characters is skipped.

The **Contents** list at the top is built automatically from the block titles,
so there's nothing to keep in sync: rename a block and the list follows. Blocks
with no title are skipped, and if two share a title the links still work.

## The Basic Information box

The box on the right of a country's, a faction's or a god's page.

**On a country** it always shows the same five rows — **Continent**,
**Capital**, **Other Cities**, **Major Organizations**, **Minor
Organizations** — in that order, with the country's name as the heading and the
flag underneath.

**On a faction** the five rows are the faction equivalents — **Leader**,
**Headquarters**, **Territory / Bases**, **Allies**, **Enemies** — with the
faction's name as the heading and its emblem underneath.

**On a god** the only fixed row is **Domain**, with the god's name as the
heading.

All three boxes then share:

- **Leave a row empty and it shows "N/A"** rather than disappearing, so the box
  looks the same on every entry.
- Some rows are lists — **Other Cities** and the **Organizations** on a country,
  **Territory / Bases**, **Allies** and **Enemies** on a faction: click *Add*
  for each entry and it gets its own line.
- **Extra rows** lets you add anything the fixed rows don't cover (*Figure
  Head*, *Population*, *Language*…). Each one needs a **Label** and a **Value**,
  and they appear at the bottom of the box in the order you add them. A row with
  no label is skipped.

### Harbingers (Gods only)

The beings who speak for a god. They go at the bottom of the Basic Information
box, as pictures **two per row** with the name underneath. Under **Harbingers**
add one entry each:

- **Name** — shown under the picture.
- **Image** — cropped to a square. Leave it empty and the frame stays blank.
- **Image position** and **Image zoom** — to reframe the picture inside its
  square, same as everywhere else. `center 20%` with a zoom of `1.2` is a good
  starting point for showing a face.

An entry with no name is skipped, and with no harbingers at all the section
doesn't appear.

## Energies, Powers and Transformations

These three work identically to each other. On the list page each entry is an
**accordion**: click the title and it opens to show the **Summary** over the
entry's background image, plus a *Read more* link to its own page.

- **Summary** — what the accordion shows. It can be several paragraphs; the
  accordion grows to fit whatever you write.
- **Background / Background position / Background zoom** — the picture behind
  the open accordion, and how it's framed.
- **Icon** — the little image next to the title.
- **Is this a custom (player-made) …?** — tick it and the entry moves to a
  separate list under the canon ones, marked with a dashed border. Leave it
  unticked for canon entries.

The rest — Description, Quote, Content blocks — builds its own page exactly as
described above.

## The Rulesbook

The **Rulesbook** collection holds the server rules. Each entry is a *chapter*:
it shows up as a card on the Rulesbook page and gets its own page underneath it.

A chapter has four fields — **Order**, **Name**, **Summary** (the line on the
card) and **Description** (the intro above the rules) — plus the usual
**Content blocks**. Each block is one rule or one group of related rules: its
**Title** is what appears in the Contents list, and the parts underneath hold
the text.

Every block title becomes a link of its own, so you can point at a single rule
instead of the whole page. Open the chapter, click the rule in the Contents
list, and copy the address from the browser — it will look like
`.../rulesbook/general-conduct#respect`. That is the link to paste in Discord.

Renaming a block changes its link, so old links to it stop working. Renaming a
whole chapter is fine — the address comes from the file name, not the name you
type — but the site owner has to rename the file for the address to follow.

## The Timeline

**There is one timeline per dimension** — Mobius, Moebius, Sol — and a bar of its
own at the top of the page switches between them. It sits apart from the reading
controls, and doesn't follow you down the page: picking a timeline is a decision
you make once on arrival, while the era indicator and the two switches are used
while reading, so those are the ones that stay stuck to the top. Which one an era belongs to is its
**Timeline** field, and a dimension only gets a tab once it has at least one era,
so creating the first era of a new world makes its tab appear on its own.

The dimension is part of the address (`/lore/timeline/moebius`), which means a
link can point at one event of one timeline, and the back button works.

The Timeline is **one line running down the page**, and the eras are stretches of
it rather than separate pictures. Scrolling is how you travel it, so it works the
same on a phone as on a desktop. Each entry in the **Timeline (eras)** collection
is one of those stretches.

An era has a colour and a piece of artwork: while the reader is inside it, the
artwork becomes the page background and the colour tints the frame, the era's
name and its cards — the same trick the species and god pages use, but following
the scroll.

Then there is `items`: everything in that era, in order. Four kinds:

| Kind | What it is |
| --- | --- |
| **Event** | A card on the line. Which side it lands on is not a choice — the page alternates them. |
| **Year marker** | A point on the line with no event of its own, e.g. `year 14`. |
| **Time gap** | Stretches the line, e.g. `roughly a thousand years`. The distance is the point: a big jump *looks* big. |
| **Wide label** | Cuts across the line, e.g. `Archie Comics // Pre-Genesis Wave`. |

Two things worth knowing when filling it in:

**Layers.** An event is either *world* history or a *release* (a game or a comic
coming out). Those are two different timelines, and mixing them is what made the
old picture busy — so readers get a switch that hides the releases. Tag them
correctly and both read well.

**Related entries.** An event can point at anything else in the archive (a god, a
world, a faction…) by section plus the entry's ID — the last part of its address,
so `chaos` for `/lore/gods/chaos`. The card shows them as chips with the entry's
real name, looked up at build time. If that entry is later renamed or deleted,
the chip simply stops appearing: no broken links.

The era shown in the bar is also the way to move between eras: it opens into a
list of all of them, and each one is a link to that stretch of the line. They are
links rather than buttons on purpose — they can be copied, opened in a new tab,
and the back button undoes the jump.

Every event also gets its own anchor, so a moderator can link one event rather
than the whole page. Hover a card and a `#` appears next to its title.

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

Countries and factions are the two collections that aren't rendered straight
from their files. `src/data/worlds/index.js` merges
`src/content/countries/*.json` into each world by `world` + `group`, and
`src/data/factions.js` does the same with `src/content/faction-entries/*.json`
into each hub by `faction` + `group`. Both pad each group with generated
placeholders up to its `count`, so written entries consume placeholder slots
rather than adding to them.

Content lives as **one JSON file per entry** under `src/content/<collection>/`.
The modules in `src/data/` pick them up with `import.meta.glob` and sort them by
the `order` field, so adding a file is enough to add an entry — no imports to
update. This is exactly the shape the CMS writes, so hand-edits and CMS edits
are interchangeable.

Images live in `public/<collection>/` and are referenced by absolute path
(`/gods/argus.png`). Because the site is served from a subpath on GitHub Pages,
those paths are prefixed at runtime by the `asset()` helper in
`src/lib/asset.js` — use it for any new content-driven image.

## Shared pieces

Countries, Factions, Gods, Energies, Powers and Transformations render the same
page shape, so the parts are shared rather than copied:

| Piece | What it does |
| --- | --- |
| `components/ContentBlock.jsx` | One content block: title, icon and its parts (text / text+image / image / regions / characters) |
| `components/CountryRegions.jsx` | The regions part, reused for a faction's characters part |
| `components/ContentToc.jsx` | The Contents list, derived from the blocks it's handed |
| `components/CountryQuote.jsx` | The chat quote |
| `components/InfoboxValue.jsx` | One value in a Basic Information row, used by both infoboxes |
| `components/Paragraphs.jsx` | Splits a CMS text on blank lines into `<p>`s |
| `components/LoreDetail.jsx` | The whole full-width page (Energies, Powers, Transformations) |
| `lib/blocks.js` | `withBlockIds()` — drops untitled blocks and gives each one a unique anchor |
| `lib/usePageAccent.js` | Swaps the page background and `--accent` for the entry's own, and puts back what was there on the way out |
| `lib/useDocumentTitle.js` | Sets the browser tab's title: this page's name, then the site's |

Every page calls `useDocumentTitle` — there is no central route-to-title table,
because the detail pages are the only ones that know the entry's name. Pages that
can fail to find their entry pass the *same* string to the hook and to
`<NotFound>`: React runs a child's effects before its parent's, so the parent has
the last word on the title and both have to agree.

On a phone the **Admin** link lives at the bottom of the sidebar panel rather
than in the top bar. It used to sit six pixels from the ☰ button, and people
reaching for the menu kept landing in the editing panel — which, asking them to
sign in with GitHub, looked like the CMS opening on its own.

The Timeline is its own layout rather than a shared one. `TimelineEra` renders an
era as a list of three-column rows — card, line, date — and the line is a
pseudo-element down the middle of the list; on narrow screens the same rows
restack with the line moved to the left margin, so there is no second layout to
keep in sync. `pages/Timeline.jsx` does the rest: it filters the eras down to the
dimension in the URL, hands each event its anchor and its side (alternating,
counting only events, so a gap or a label doesn't break the rhythm), and an
IntersectionObserver over the era sections drives both the "you are here" bar and
the page background. That bar is sticky on desktop only — the frame leaves about
295px of usable width on a phone, where its controls need three rows and a
sticky one would eat a fifth of the screen on every page.

A faction's characters part is the regions part with different field names, so
`ContentBlock` translates `groups`/`characters` into `regions`/`locations` and
hands it to the same component instead of duplicating the carousel.

The Rulesbook works the same way with fewer pieces: `pages/rulesbook/Rulesbook.jsx`
lists `src/content/rules/*.json` as cards and `pages/rulesbook/RuleChapter.jsx`
renders one chapter with `ContentToc` + `ContentBlock`, without infobox, quote or
page background.

`CountryDetail`, `FactionSubDetail` and `GodDetail` compose those parts
themselves because they also carry an infobox and their own page background /
accent effect. Any text that
comes from the CMS should go through `Paragraphs` (or `InfoboxValue`) so blank
lines keep working.

The accent colour is the CSS variable `--accent`, set on `document.body` from
the entry's `color` and restored on unmount — that, and the page background, is
what `usePageAccent` does. The five pages that have their own look (species,
gods, items, countries and factions) each carried an identical copy of that
effect; they now pass it the two values, which is the only thing that differed
between them (some entries keep the art in `image`, others in `background`).
Anything on a detail page that should follow it uses
`color-mix(in srgb, var(--accent) N%, transparent)` rather than a literal
magenta. Site chrome outside the fichas (navbar, list cards, FAQ boxes) is still
hardcoded on purpose.

## The navigation

The sections live in `components/Sidebar.jsx`, not in the top bar: on desktop it
is a rail of icons pinned to the left edge that widens on hover or on
`:focus-within` (so keyboard and mouse behave the same), and the button at the
bottom pins it open. Below 900px there is no rail — the same component is the
panel the hamburger opens, already expanded.

The submenus are not written by hand: each section maps over the same data the
pages use (`data/rules`, `data/lore/lore`, `data/species`, `mainWorlds`,
`mainFactions` + `sideFactions`), so publishing a world or a rule chapter adds it
to the navigation on its own. Entries without a route are left out — the Lore
section *Timeline* has no page yet, and side dimensions are only a button on the
Worlds page.

The open/closed state of a submenu follows the current route, with the user's
last click winning while they stay on the same page (same trick as the mobile
panel: what's stored is the path the choice was made on, so it expires on
navigation instead of needing an effect to resync).

`Layout.jsx` owns two pieces of state because they are shared: the mobile panel
(the top bar has the button, the sidebar is the panel) and the desktop pin (the
content has to move aside, which is the `.with-rail` wrapper's job). The icons
are hand-drawn SVGs in `components/NavIcons.jsx` — stroke and `currentColor`, so
they inherit the link colour and the active tint.

The rail's widths are the CSS variables `--rail-w` / `--rail-w-open`. Hovering
overlays the content (no reflow under the pointer); pinning shifts it.

## The editing panel

`public/admin/` holds the [Sveltia CMS](https://github.com/sveltia/sveltia-cms)
panel: `index.html` loads it from a CDN, and `config.yml` defines the GitHub
backend plus one collection per content type.

Because several collections share fields, `config.yml` uses YAML anchors: the
**Gods** collection defines `&quote`, `&blocks` and `&extra_info`, and the later
collections pull them in with `- *quote`, `- *blocks` and `- *extra_info`. An
anchor has to appear before the aliases that use it, which is why the shared
definitions live in the first collection that needs them. **Countries** keeps its
own `quote` and `blocks`, and **Factions** (`faction-entries`) keeps its own
`blocks` — those two are the only ones whose blocks offer the *Regions* and
*Characters* part types respectively, so they can't share the generic `&blocks`.

Fields the pages read must be declared here, even the optional ones: an
undeclared field is invisible in the panel, and editing that entry through the
CMS is liable to drop it from the JSON.

Login goes through a **Cloudflare Worker** running
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), which holds the
GitHub OAuth App credentials (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`) and an
`ALLOWED_DOMAINS` allowlist. Its URL is set as `base_url` under `backend` in
`config.yml`.

Note that Sveltia ignores the Decap-only `local_backend` and `locale` options.
To edit locally, open `/admin/` on localhost and use **Work with Local
Repository**, which only appears there.

## The page background

The default background is served in three formats, listed best-first in an
`image-set()` in `src/index.css`: AVIF, WebP and — as the fallback for browsers
that don't understand `image-set()` — the original JPEG, in a plain declaration
before it. **The JPEGs have to stay**: they are that fallback.

Measured on the built site, the browser fetches only the format it picked:

| | JPEG (what the deploy serves today) | AVIF |
| --- | --- | --- |
| Desktop | 280 kB | **178 kB** |
| Mobile | 174 kB | **70 kB** |

Those JPEG figures are the *deployed* ones: the files in `src/assets` are 937 kB
and 330 kB, and `optimize:images` re-compresses them on every deploy. That script
does not touch AVIF (the format isn't in its list), so the committed AVIFs are
already final; it does re-compress the WebPs.

To regenerate them after changing the artwork:

```bash
node -e "const s=require('sharp');for(const n of ['desktop','mobile']){const f='src/assets/background-page-N-'+n;s(f+'.jpg').avif({quality:50,effort:6}).toFile(f+'.avif');s(f+'.jpg').webp({quality:75}).toFile(f+'.webp')}"
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main` — including the commits the CMS makes. Vite's `base` is
`/PU-Web/` in builds only; `public/404.html` plus the decoder in `index.html`
handle SPA routing on Pages.

`.github/workflows/ci.yml` is the other half: on every pull request it runs the
linter and the build. It is deliberately *not* wired into the deploy — saves from
the CMS panel land straight on `main` and publish, and a lint warning about the
code should never keep a content fix off the site. Checks belong on the pull
request; the deploy still only depends on the build working.

Because each build renames the hashed asset bundles and drops the old ones, a
browser holding a stale `index.html` will request a deleted JS file and get a
404 until it reloads. That's the cause of the blank page mentioned above, and a
hard reload is the fix.

## Link previews

`index.html` and `public/404.html` carry the Open Graph tags that turn a pasted
link into a card in Discord, plus `public/og-image.jpg` (1200×630, the card
picture). They are duplicated on purpose: Pages serves `404.html` for every deep
link, which is exactly the kind of link people paste.

The image URL in those tags is absolute and hardcoded — crawlers don't resolve
relative paths, and Vite's `%BASE_URL%` covers the path but not the domain. **If
the site ever moves to another address, both files have to be updated.**

Two limits worth knowing. The crawler doesn't run React, so every link shows the
same card — a per-page card would mean generating one HTML file per route at
build time. And Pages answers deep links with a real HTTP 404, which some
crawlers refuse to build a preview from.
