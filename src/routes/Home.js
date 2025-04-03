import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const projectRoot = path.resolve(__dirname, '..', '..');

router.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'public', 'index.html'));
});

// aici pot sa adaug alte rute pt API

export default router;