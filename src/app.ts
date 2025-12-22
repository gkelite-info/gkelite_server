import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send("Heyy GK Elite-Info");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});