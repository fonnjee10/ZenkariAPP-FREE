export default async function handler(req, res) {
    try {
        const response = await fetch(
            "https://globular-camille-unblundering.ngrok-free.dev/v1/chat/completions",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body)
            }
        );

        const text = await response.text();
        let data;

        // Essayer de parser correctement la réponse
        try {
            data = JSON.parse(text);
        } catch (e) {
            // Si pas du JSON → renvoyer proprement au frontend
            return res.status(200).json({
                choices: [
                    {
                        message: {
                            content: "⚠️ Réponse non-JSON de LM Studio / Ngrok :\n\n" + text
                        }
                    }
                ]
            });
        }

        // Si JSON valide → renvoyer normalement
        return res.status(200).json(data);

    } catch (err) {
        // Catch global (erreur réseau, crash LM Studio, etc)
        return res.status(500).json({
            choices: [
                {
                    message: {
                        content: "⚠️ Erreur serveur : " + err.message
                    }
                }
            ]
        });
    }
}
