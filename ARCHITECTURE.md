# Architecture

This application is a variant of [Reinforcement Learning 2](https://github.com/IMAGINARY/reinforcement-learning-2).

It installs the base application source code, copies a series of extra files on top of it, and uses the 
original application's build script to build the final application.

## Build process

The build process is started by the `build` action in the `package.json` file. It takes the
following steps (please check the file for potential updates):

- Remove the `dist` directory if it exists.
- Clone the base application source code into the `dist` directory using git.
- Copy extra dependencies (e.g. fonts, libraries) into the `dist/vendor` directory.
- Copy the contents of the `extras` directory into the `dist` directory.
- Run `npm install` and `npm build` into the `dist` directory to build the application.

## Modifications via `extras/`

### Entry points

The file `webpack.entry-points.json` is included into `reinforcement-learning-2`'s webpack 
configuration. It defines the entry points (the top level JavaScript files) for the application, 
and the associated HTML files where the application will be injected.

The app is split in two independent stations, and we also a "demo" `index.html` that shows both
side by side (useful for development).

These entry points do the "assembling" of the reinforcement learning components that we want on
each screen.

### Configuration

The `settings-exhibit.yml` file overrides the default configuration of the base application.

We also copy new translations from the `tr` directory.

The `data` directory contains map definitions that are loaded by the app to initialize the
interactive components.

### Styles

In `src/sass` we have a lot of styles that override the application's defaults. 

In `static/icons` we add a lot of new images which are either referenced from the
configuration or used in the stylesheets.
