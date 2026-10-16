const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const { createApp } = require("../dist/app.js");

test("health is reachable and does not advertise framework details", async () => {
  const server = createApp().listen(0, "127.0.0.1");
  try {
    await once(server, "listening");
    const origin = `http://127.0.0.1:${server.address().port}`;
    const health = await fetch(`${origin}/health`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { status: "ok", service: "grover" });
    assert.equal(health.headers.get("x-powered-by"), null);
    assert.equal(health.headers.get("cache-control"), "no-store");
    const missing = await fetch(`${origin}/not-a-route`);
    assert.equal(missing.status, 404); assert.deepEqual(await missing.json(), { error: "not_found" });
    const mutation = await fetch(`${origin}/health`, { method: "POST" });
    assert.equal(mutation.status, 404);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
