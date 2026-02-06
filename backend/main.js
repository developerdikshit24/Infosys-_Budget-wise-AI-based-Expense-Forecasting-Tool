import { app } from "./app.js";
import dotenv from 'dotenv';
import { test } from './src/config/db.js';

dotenv.config({
    path: './env'
})

test().then(() => {
    app.on("error", (error) => {
        console.log("Database Can't connect: ", error);
    })
    app.listen(8000, () => { console.log("And All Set..") })
})
    .catch((error) => {
        console.log('DB Connection Failed: ', error)
    })
