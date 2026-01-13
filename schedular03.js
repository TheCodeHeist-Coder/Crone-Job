

import cron from "node-cron";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archive from "./data/archive.json" with {type: 'json'}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const houseKeeping = () => {
    console.log("Running a houseKeeping task at: ", new Date())

    try {
        archive.map((item, index) => {
            const presentDate = new Date().getTime();
            const recordDate = new Date(item.date).getTime();
            console.log("The number of days: ", Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24)))

            if(Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24)) > 180){
                archive.splice(index, 1);
               fs.writeFileSync(
                path.join(__dirname, 'data', 'archive.json'),
                JSON.stringify(archive, null, 2),
                'utf-8'
            );
            }
        })
    } catch (error) {
        console.error(error);
    }

    console.log("Task ended....")
}


cron.schedule("* * * * * *", houseKeeping);