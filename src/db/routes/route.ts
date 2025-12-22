import express from "express";
import User from "../models/user";

const router = express.Router();

router.get("/test", async (req, res) => {
    const data = await User.findAll();

    res.status(201).send({message:'Saraswathi we got it', data})
    return
});

router.post("/create-user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send({ message: "User created!", user});
    } catch (error) {
  const err = error as Error;
  res.status(500).json({ error: err.message });
}
});


export default router;
