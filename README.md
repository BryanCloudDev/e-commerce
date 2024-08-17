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
$ yarn install
```

Then we need to run the following command in order to get the database running, make sure you have docker installed:

```bash
$ docker compose up
```

## Running the app

```bash
# development
$ yarn start:dev

# production mode
$ yarn start
```

## Build the application

```bash

# build
$ yarn build
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## License

[MIT licensed](LICENSE).
