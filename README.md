# Grover Backend

A small Express/TypeScript backend scaffold. The original source files were empty;
this checkout now provides a health endpoint, explicit 404 responses, configuration
and a smoke test. It does **not** implement payments, authentication, persistence,
customer workflows or a production-ready service.

## Run Locally

Use Node.js 22 or 24 and npm. From this repository's root:

```sh
npm ci
npm test
npm run build
npm start
```

Open `http://127.0.0.1:3000/health`. Expected JSON:

```json
{"status":"ok","service":"grover"}
```

`npm run dev` builds once and watches compiled JavaScript for server restarts. Run
`npm run build:watch` in a second terminal to recompile TypeScript edits. This uses
Node's built-in watcher rather than the obsolete `ts-node-dev` dependency chain.
The application factory does not start
a listener when imported, allowing tests to bind an isolated ephemeral port.

## Configuration

The server optionally reads a local `.env`; `.env.example` documents the two inputs:

| Variable | Default | Meaning |
| --- | --- | --- |
| HOST | 127.0.0.1 | Bind address; set explicitly when running inside a container. |
| PORT | 3000 | Integer TCP port from 1 through 65535; invalid values fail startup. |

No API keys or database connection are required by this scaffold. Never commit
actual environment files. CORS is not enabled globally; add a scoped origin policy
when there is a real browser client and API contract.

## Verification And Boundaries

`npm test` compiles the actual source and checks health JSON, cache/framework
headers, unknown routes and rejection of POST to the health path using real HTTP.
It does not prove business functionality, security certification or deployment.
There are no claimed users, traffic or uptime measurements.

Generated `node_modules/` must not be tracked. Keep `package-lock.json` and use
`npm ci` to reproduce dependencies. Removing dependencies from Git's index does
not delete local dependencies or rewrite old repository history.
