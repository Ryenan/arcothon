import { initDb } from '../db.js';

export const getDoctor = async (_, res) => {
    const db = await initDb();
    const docs = await db.all("SELECT * FROM doctor");
    console.log(docs);
    res.status(200).json(docs);
};

export const addDoctor = async (req, res) => {
    const { nome, email, phone, password, cpf } = req.body;

    if (!nome || !email || !phone || !password || !cpf) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const db = await initDb();
    await db.run("INSERT INTO doctor (nome, email, phone, password, cpf) VALUES (?, ?, ?, ?, ?)", [nome, email, phone, password, cpf]);

    res.status(201).json({ message: "Doctor added successfully" });
}

