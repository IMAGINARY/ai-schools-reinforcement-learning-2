# ai-schools-reinforcement-learning-2
An exhibit ("Robot Maze") based on reinforcement-learning-2 for the Erasmus+ project "AI Exhibits: Learning Artificial Intelligence through Interactive Exhibits"

This variant of the original exhibit shows a single screen with the map editor. It's designed
to be used through online browsers, in schools workshops. 

## Building

Requires Node.js (v24.4.1 or greater) and npm.

Run the following from the root directory of the project:

```bash
npm install
npm run build
```

This will create a `dist` directory with the compiled exhibit. This directory can be served by any web server.

## Development

Run both

```bash
npm run watch:copy
```

and

```bash
npm run watch:compile
```

The first will copy any files changed in `extras` to `dist` (without requiring a full build), and
the second will recompile the JavaScript and SASS files (it actually runs watch on the inner
project, inside of `dist`).

## Configuration

The config directory has several data definitions.

You can override any of them in the settings-exhbit.yml file in the root of the built project.

## Running

Open `index.html`.

## Sentry

The app supports Sentry.

The `index.html` page can take the DSN from the `sentry-dsn` query string parameter.

It can also get the DSN from the `app.sentry.dsn` configuration key in the  `settings.yml` file.

## Credits

This adaptation was developed by Eric Londaits for Imaginary gGmbH.

It is part of "AI Exhibits". Funded by the European Union.  
\[Project Code: 2023-1-DE03-KA220-SCH-000153447\]

Based on an exhibit supported by [Futurium](http://futurium.de/).

## License

Code licensed under the MIT License. See [LICENSE](LICENSE) for details.

Copyright 2025 Imaginary gGmbH.
