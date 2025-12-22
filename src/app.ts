import express from 'express';
import dotenv from 'dotenv'
import dbInit from './db/init';
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

dbInit();

app.get('/', async (req, res) => {
    res.send("Heyy GK Elite-Info");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});