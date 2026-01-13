
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import invoices from './data/invoice.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archiveInvoiceTask = () => {
    console.log("Running archive invoices task: ", new Date());

    try {
        const paidInvoices = invoices.filter(item => item.status === "paid");

        if (paidInvoices.length > 0) {

            paidInvoices.forEach(item => {
                const index = invoices.findIndex(e => e === item);
                if (index !== -1) invoices.splice(index, 1);
            });

            fs.writeFileSync(
                path.join(__dirname, 'data', 'invoice.json'),
                JSON.stringify(invoices, null, 2),
                'utf-8'
            );

            fs.writeFileSync(
                path.join(__dirname, 'data', 'archive.json'),
                JSON.stringify(paidInvoices, null, 2),
                'utf-8'
            );

            console.log("The paid invoices are: ", paidInvoices);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Archive invoices task ended:");
};

cron.schedule("*/30 * * * * *", archiveInvoiceTask);
