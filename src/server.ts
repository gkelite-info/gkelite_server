import express from 'express';
import dotenv from 'dotenv';
import dbInit from './db/init';

import testRoute from "./db/routes/route";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;
dbInit();

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

console.log("Saraswathi");

app.use("/", testRoute);


console.log("Developer");


app.listen(port, () => {
    console.log(`"Server is running on port ${port}`)
});
