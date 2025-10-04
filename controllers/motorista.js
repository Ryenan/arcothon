import { initDb } from '../db.js';

export const getMotorista = async (_, res) => {
    const db = await initDb();
    const moto = await db.all("SELECT * FROM motoristas");
    console.log(moto);
    res.status(200).json(moto);
};

export const addMotorista = async (req, res) => {
    const { nome, email, phone, password, cpf } = req.body;

    if (!nome || !email || !phone || !password || !cpf) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const db = await initDb();
    await db.run("INSERT INTO motoristas (nome, email, phone, password, cpf) VALUES (?, ?, ?, ?, ?)", [nome, email, phone, password, cpf]);

    res.status(201).json({ message: "Motorista added successfully" });
}

