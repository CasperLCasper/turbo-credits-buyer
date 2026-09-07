import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Iegūst Turbo info (adresi)
app.get('/api/turbo-info', async (req, res) => {
    try {
        const response = await fetch('https://payment.services.ar-io.dev/v1/info');
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Iesniedz funding transakciju
app.post('/api/submit-funding', async (req, res) => {
    const { txId } = req.body;
    
    if (!txId) {
        return res.status(400).json({ error: 'Nav txId' });
    }
    
    try {
        const response = await fetch('https://payment.services.ar-io.dev/v1/account/balance/base-eth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ txId })
        });
        
        const data = await response.text();
        res.status(response.status).send(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Turbo kredītu pircējs uz porta ${PORT}`);
});
