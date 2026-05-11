# Lendsqr Backend Assessment

A NestJS backend for user and wallet management, using MySQL/Knex and Swagger documentation.

## Overview

This project provides:

- User registration with generated `userId` and `fauxToken`
- Wallet creation for each user
- Wallet funding, transfers, withdrawals, and balance lookup
- Swagger API documentation at `/api`
- A simple bearer-style faux auth guard

## Requirements

- Node.js 18+ or compatible
- npm
- MySQL database

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=demo_credit
PORT=3000
```

3. Start the application:

```bash
npm run start
```

4. Open Swagger docs:

```text
http://localhost:3000/api
```

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api
```

Use the **Authorize** button in Swagger to enter the faux auth token for protected routes.

### Token format

```text
Bearer token-12345
```

## Available endpoints

- `POST /users` — create a new user
- `POST /wallets/fund` — fund a wallet
- `POST /wallets/transfer` — transfer funds between wallets
- `POST /wallets/withdraw` — withdraw funds from a wallet
- `GET /wallets/:userId` — retrieve wallet balance by user ID

## Notes

- `POST /users` returns both `userId` and `fauxToken`
- Duplicate email registration returns **409 Conflict**
- Wallets are linked to users by UUID
- Protected endpoints require an `Authorization` header

## Useful commands

```bash
npm run start
npm run start:dev
npm run start:prod
npm run test
npm run test:e2e
npm run test:cov
```

## Project structure

- `src/main.ts` — application bootstrap and Swagger setup
- `src/app.module.ts` — root NestJS module
- `src/config/knex.config.ts` — database connection configuration
- `src/modules/users` — user module
- `src/modules/wallets` — wallet module
- `src/common/guards/faux.auth.guard.ts` — faux auth guard
- `src/common/decorators/public.decorator.ts` — public route decorator

## Troubleshooting

- If Swagger does not appear, confirm the app is running and visit `/api`
- If env vars are missing, verify `.env` is in the root and contains `DB_HOST`, `DB_USER`, `DB_PASS`, and `DB_NAME`
- If a wallet cannot be found, ensure you are using the exact `userId` returned by user creation

---

Built for the Lendsqr backend assessment.
