## Description

backend

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### .env

```
cp .env.example .env
```

### ssh tunnel:

```
ssh -R 80:localhost:3000 $(uuidgen)@ssh.localhost.run
```


### edit with your ssh tunnel link:
```
scripts/register.notifications.endpoint.ts
```

### start backend:
```
yarn start
```

### compile and run:
```
tsc scripts/register.notifications.endpoint.ts && node scripts/register.notifications.endpoint.js
```



Make sure to monitor your backend terminal, message with subscription confirmation url will be recieved
you need to ping them, browser, curl etc.

ping order endpoint to initiate card payment

[//]: # (## Test)

[//]: # ()
[//]: # (```bash)

[//]: # (# unit tests)

[//]: # ($ npm run test)

[//]: # ()
[//]: # (# e2e tests)

[//]: # ($ npm run test:e2e)

[//]: # ()
[//]: # (# test coverage)

[//]: # ($ npm run test:cov)

[//]: # (```)