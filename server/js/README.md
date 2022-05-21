# Gangnam API

Perform `npm install` in this folder first.

## Development

Use `npm run start:watch` to start server in dev mode. The server will restart each time you modify the code.

Execute `npm run build:dev` to create dev build. This command run `npm run lint:fix` before building.

Use `npm run start:dev` to start server in dev mode. **Note** use **start:dev** only after **build:dev**, 
otherwise it can cause issues with debugging if to use **start:dev** with production build.  

## Testing

Use `npm run start:testing` to start server in test mode

Run `npm run test` to execute unit tests.

## Linting

Run `npm run lint` to check linting error. Don't miss this step before creating PR, please.

Run `npm run lint:fix` to fix some linting errors automatically

## Build

Run `npm run build` to compile to `dist` folder.

Launch compiled project with `npm run start`

## Packaging

Build code and then `npm run pkg` to package code in your system binaries
