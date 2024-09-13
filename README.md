<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

Intial project in order to create an e-commerce application for developing purposes.

## Requisites

- Node v22.2.0
- Docker
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## Installation

```bash
$ npm install
```

Then we need to run the following command in order to get the database running, make sure you have docker installed:

```bash
$ docker compose up
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

## Build the application

```bash

# build
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests not `implemented yet`
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

[MIT licensed](LICENSE).
