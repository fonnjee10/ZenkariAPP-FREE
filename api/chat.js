import { Readable } from 'stream';

export default async function handler(req, res) {
    try {
        const response = await fetch(
            "https://zenkaritecuitai.ngrok.app/v1/chat/completions",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...req.body, stream: true })
            }
        );

        // Si Ngrok ou LM Studio renvoie une erreur direct
        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText });
        }

        // Headers essentiels pour que le navigateur ne coupe pas la connexion
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Content-Encoding', 'none');

        // On transforme la réponse en flux lisible pour Node.js
        const reader = Readable.fromWeb(response.body);

        // On envoie chaque morceau dès qu'il arrive
        reader.on('data', (chunk) => {
            res.write(chunk);
        });

        reader.on('end', () => {
            res.end();
        });

        reader.on('error', (e) => {
            console.error("Erreur de flux:", e);
            res.end();
        });

    } catch (err) {
        console.error("Erreur serveur proxy:", err);
        res.status(500).json({ error: err.message });
    }
}



