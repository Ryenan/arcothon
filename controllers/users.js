import { initDb } from '../db.js';

export const getUsers = async (_, res) => {
    const db = await initDb();
    const users = await db.all("SELECT * FROM user");
    res.status(200).json(users);
};

export const addUsers = async (req, res) => {
    const { nome, email, phone, password, cpf } = req.body;

    if (!nome || !email || !phone || !password || !cpf) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const db = await initDb();
    await db.run("INSERT INTO user (nome, email, phone, password, cpf) VALUES (?, ?, ?, ?, ?)", [nome, email, phone, password, cpf]);
    
    res.status(201).json({ message: "User added successfully" });
}

