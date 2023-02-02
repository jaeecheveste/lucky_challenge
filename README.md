## Description

[Nest](https://github.com/nestjs/nest) Challenge created for Ezequiel Echeveste in Nest Framework

## Requirements
```bash
- Docker
```
## Installation
```bash
Add environment variables to src/config/env-production.yaml (Sent by email)
Run bash to initialize containers and start server API
$ ./start.sh

This will install:
-Database
-Redis
-API
-Migrations
```
## Configuration
Depending on the environment , you can place config files inside src/config

## Documentation
```bash
In order to test API , please follow the DOC located in:
http://localhost:3000/api


PROJECT STRUCTURE:

AUTH MODULE
All related to authentication
USERS MODULE:
All related to users
REPOSITORY MODULE:
The idea is to keep separate TypeOrm implementation inside Repository Module. In order to reduce coupling. 
CACHING MODULE:
This module provides a caching service with Redis decoupled implementation
```

## Running the app locally
```bash
$ npm install
$ npm run start

```

## Stay in touch

- Author - Ezequiel Echeveste
- Email - jae.echeveste@gmail.com
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
