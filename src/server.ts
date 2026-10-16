import "dotenv/config";
import { createApp } from "./app";

const rawPort = process.env.PORT ?? "3000";
if (!/^[1-9][0-9]{0,4}$/.test(rawPort) || Number(rawPort) > 65535) throw new Error("INVALID_PORT");
const host = process.env.HOST ?? "127.0.0.1";
const server = createApp().listen(Number(rawPort), host, () => {
  console.log(`Grover health scaffold listening on ${host}:${rawPort}`);
});
server.on("error", () => { console.error("grover_server_failed"); process.exitCode = 1; });

function shutdown() {
  server.close(() => { process.exitCode = 0; });
  setTimeout(() => { console.error("grover_shutdown_timeout"); process.exit(1); }, 10000).unref();
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
