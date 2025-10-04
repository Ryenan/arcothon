import express from "express";
import { getAgendamentos , addAgendamento, updateAgendamento, deleteAgendamento } from "../controllers/agendamento.js";

const router = express.Router();

router.get('/', getAgendamentos);

router.post('/add', addAgendamento);

router.put('/update/:id', updateAgendamento);

router.delete('/delete/:id', deleteAgendamento);

export default router;
