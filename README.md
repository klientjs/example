# Klient Example

![badge-coverage](.github/badges/coverage.svg)

## Introduction

This repository is an example usage of [Klient](https://github.com/klientjs/core) packages in a web React project based on [open-stack](https://github.com/klientjs/open-stack) template. It also demonstrates the possible creation of web project consuming a real API which is not ready yet, by using mock.

The project is a fake blog post application composed by a frontend (where active post are exposed) and a backend (where posts can be managed by admin users only). It is using [@klient/mock](https://github.com/klientjs/mock) to define some fake API REST entrypoints. All requests made with klient instance will be catched and request promises will be resolved with a mocked responses (supposed to be the same as real API response). A delay has been setted for each actions (write content is generally longer than read).

Additionnaly, manipulated data are persisted in browser storage (in a cookie, using [@klient/storage](https://github.com/klientjs/storage)), to feel a sensation of real API which deal with a real database. If you reload your page, data will be in same state.

All mocks are supposedly removable if you switch to a real API which handle requests in same way.

Klient debug mode is enabled, the whole dispatch process is logged and exposed in browser console. Klient instance in also attached to window for quick manual tests (available in prop `window.klient`).

## Structure

```
src/
├─ __tests__/       | -> Project tests files
├─ api/             | -> Consumed API configuration
│  ├─ mocks/        |    -> Mock files (removable)
│  ├─ models/       |    -> Model files (type definitions)
│  ├─ resources/    |    -> REST resources (see @klient/rest)
│  ├─ index.tsx     |    -> Main Klient instance (configuration & export)
├─ components/      | -> Components used by pages
├─ pages/           | -> Pages components & routing
├─ styles/          | -> Styles files (sass)
├─ index.tsx        | -> Application entrypoint
```

## Installation

```bash
# Clone repository
$ git clone https://github.com/klientjs/example.git klient-example
$ cd klient-example

# Install dependencies
$ npm install

# Start dev server
$ npm start
```

## Docker

Just use `./npm` instead of `npm`

```bash
# Install dependencies
$ ./npm install

# Start dev server
$ ./npm start
```
