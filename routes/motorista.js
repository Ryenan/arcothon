import express from "express";
import { addMotorista , getMotorista } from "../controllers/motorista.js";

const router = express.Router();

router.get('/', getMotorista);

router.post('/addMotorista', addMotorista);

export default router;
