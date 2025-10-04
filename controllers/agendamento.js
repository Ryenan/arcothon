import { initDb } from "../db.js";

export const getAgendamentos = async (req, res) => {
    const db = await initDb();

    const agendamentos = await db.all("SELECT * FROM agendamentos");
    res.status(200).json(agendamentos);
};

export const addAgendamento = async (req, res) => {
    const db = await initDb();

    const {userId, motoristaId, doctorId, data, hora, motivo, justificativa, confirmado} = req.body;

    if (!userId || !motoristaId || !doctorId || !data || !hora || !motivo || !justificativa || !confirmado) {
        return res.status(400).json({ error: "All fields are required" });
    }

    await db.run("INSERT INTO agendamentos (userId, motoristaId, doctorId, data, hora, motivo, justificativa, confirmado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [userId, motoristaId, doctorId, data, hora, motivo, justificativa, confirmado]);

    res.status(201).json({ message: "Agendamento added successfully" });
};

export const updateAgendamento = async (req, res) => {
    const db = await initDb();
    const { id } = req.params;
    const { userId, motoristaId, doctorId, data, hora, motivo, justificativa, confirmado } = req.body;

    const agendamentoAtual = await db.get("SELECT * FROM agendamentos WHERE id = ?", [id]);
    if (!agendamentoAtual) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    const novoUserId = userId !== undefined && userId !== '' ? userId : agendamentoAtual.userId;
    const novoMotoristaId = motoristaId !== undefined && motoristaId !== '' ? motoristaId : agendamentoAtual.motoristaId;
    const novoDoctorId = doctorId !== undefined && doctorId !== '' ? doctorId : agendamentoAtual.doctorId;
    const novaData = data !== undefined && data !== '' ? data : agendamentoAtual.data;
    const novaHora = hora !== undefined && hora !== '' ? hora : agendamentoAtual.hora;
    const novoMotivo = motivo !== undefined && motivo !== '' ? motivo : agendamentoAtual.motivo;
    const novaJustificativa = justificativa !== undefined && justificativa !== '' ? justificativa : agendamentoAtual.justificativa;
    const novoConfirmado = confirmado !== undefined && confirmado !== '' ? confirmado : agendamentoAtual.confirmado;

    await db.run(
        "UPDATE agendamentos SET userId = ?, motoristaId = ?, doctorId = ?, data = ?, hora = ?, motivo = ?, justificativa = ?, confirmado = ? WHERE id = ?",
        [novoUserId, novoMotoristaId, novoDoctorId, novaData, novaHora, novoMotivo, novaJustificativa, novoConfirmado, id]
    );

    res.status(200).json({ message: "Agendamento updated successfully" });
};

export const deleteAgendamento = async (req, res) => {
    const db = await initDb();
    const { id } = req.params;
    
    const agendamento = await db.get("SELECT * FROM agendamentos WHERE id = ?", [id]);

    if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    await db.run("DELETE FROM agendamentos WHERE id = ?", [id]);
    res.status(200).json({ message: "Agendamento deleted successfully" });
};
