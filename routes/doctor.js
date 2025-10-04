import express from "express";
import { addDoctor, getDoctor } from "../controllers/doctor.js";

const router = express.Router();

router.get('/', getDoctor);

router.post('/addDoc', addDoctor);

export default router;
