import express from 'express';
import path from 'path';
import cron from 'node-cron';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "data");
const backupDir = path.join(__dirname, "backups");

cron.schedule("*/10 * * * * *", async () => {
    try {
        const timeStamp = new Date().toISOString().replace(/[:.]/g, "-");
        const destination = path.join(backupDir, `backup-${timeStamp}`);

        await fs.promises.cp(sourceDir, destination, { recursive: true });

        console.log(`Backup created at ${destination}`);
    } catch (error) {
        console.log("Backup failed:", error);
    }
});

app.listen(4000, () => {
    console.log("CodeHeist: Server is still alive ");
});
