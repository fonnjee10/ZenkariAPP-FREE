import { Readable } from "stream";

export default async function handler(req, res) {
  let keepAlive;

  try {
    const response = await fetch(
      "https://globular-camille-unblundering.ngrok-free.dev/v1/chat/completions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...req.body, stream: true })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    // 🔹 Headers SSE stricts
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no"); // anti-buffer proxy
    res.flushHeaders?.(); // 🔥 force l’envoi immédiat

    // 🔥 KEEP-ALIVE toutes les 8s (CRITIQUE)
    keepAlive = setInterval(() => {
      res.write(":\n\n");
    }, 8000);

    const reader = Readable.fromWeb(response.body);

    reader.on("data", (chunk) => {
      // normalisation en string
      const text = chunk.toString();

      // ignore les chunks vides
      if (!text.trim()) return;

      res.write(text);
    });

    reader.on("end", () => {
      clearInterval(keepAlive);
      res.end();
    });

    reader.on("error", (err) => {
      clearInterval(keepAlive);
      console.error("Erreur stream LM:", err);
      res.end();
    });

  } catch (err) {
    clearInterval(keepAlive);
    console.error("Erreur proxy:", err);
    res.status(500).json({ error: err.message });
  }
}
