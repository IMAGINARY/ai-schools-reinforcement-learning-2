# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Robot Maze" — a single-screen browser variant of the IMAGINARY `reinforcement-learning-2`
exhibit, built for the "AI Exhibits" Erasmus+ project and used in school workshops. It shows
one screen with an interactive maze editor. Requires Node.js >= 24.4.1.

## Build architecture (read this first)

This repo is an **overlay on a base app, not a standalone app**. It contains almost no
application source of its own. `npm run build` (see `package.json`) assembles the app by:

1. `rm -rf ./dist`
2. `degit github:IMAGINARY/reinforcement-learning-2#v1.17.2 --force dist` — clone the pinned base app into `dist/`
3. `npm run copy-font` — copy Roboto into `dist/vendor/roboto`
4. `npm run remove-files` — delete the base app's `exhibit.html` / `embed.html`
5. `cp -R ./extras/. ./dist/.` — overlay all customizations from `extras/`
6. `cd ./dist && npm install && npm run build` — run the base app's webpack build

**Edit source only in `extras/`.** `dist/` is generated and git-ignored — never edit it by
hand, since changes there are wiped on the next rebuild. To bump the base app, change the
`#v1.17.2` tag in the `build` script in `package.json`.

This is a single-screen variant: `extras/webpack.entry-points.json` defines one `default`
entry. See `ARCHITECTURE.md` for a prose description of the same overlay/build process.

## Commands

- **Full build:** `npm install && npm run build` → output in `dist/`, servable by any static web server.
- **Develop** (run both in parallel):
  - `npm run watch:copy` — copies changed `extras/**` into `dist/` (cpx, no full rebuild)
  - `npm run watch:compile` — `cd dist && npm run watch`, webpack watch on the assembled app
- **Run:** open `dist/index.html`.
- **Tests:** none. The base app's `npm test` is a no-op stub.

## How the app is assembled (`extras/`)

- `extras/webpack.entry-points.json` — single `default` entry mapping `main.js` → `index.html`,
  injected into the base app's webpack config.
- `extras/src/js/main.js` — the entry point. It `require`s base-app modules by relative path
  (`./view-pixi/pixi-composite-app`, `./components/interactive-map-editor`, `./run-exhibit`, …)
  because it is copied into `dist/src/js/` and resolves against the base app's tree. Builds a
  1180×820 PIXI app and mounts `MapEditorInteractive`. (`ExploreExploitInteractive` and
  `RewardsInteractive` are imported but unused in this single-screen variant.)
- `extras/src/js/helpers-html/app-scaler.js` — scales the fixed 1180×820 layout to the viewport.
- `extras/src/html/index.html` — page shell with mount points (`#pixi-app-container`,
  `#map-editor-component`, `#palette`, `#training-ui`); loads vendored jQuery, Bootstrap, PIXI, i18n.

## Where to change things

- **Gameplay** (tile types, rewards, robot, idle timeout, panel options) →
  `extras/settings-exhibit.yml`, which overrides the base app's config. Defines 7 tile types,
  each with `walkable` / `reward` / `texture` / `editorIcon` / `reaction`.
- **Styles** → `extras/src/sass/` (entry `futurium-suitcase.scss`; put custom rules in
  `_futurium-suitcase-overrides.scss` / `_futurium-suitcase-ui.scss`).
- **Translations** → `extras/tr/{de,en,nl}.json` (default language is `de`).
- **Assets** → `extras/static/icons/` (PNG for runtime, SVG for the editor palette); referenced
  from `settings-exhibit.yml` and the SASS files.
- **Maze definitions** ship with the base app at `dist/data/mazes/*.json` (a grid of tile-type
  ids); they are not in `extras/`.

## Sentry

Optional. The DSN can come from the `?sentry-dsn=` query-string parameter or the
`app.sentry.dsn` key in settings.
