import express from "express";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.get("/health", (_req, res) => {
    res.set("Cache-Control", "no-store").json({ status: "ok", service: "grover" });
  });
  app.use((_req, res) => { res.status(404).json({ error: "not_found" }); });
  return app;
}
