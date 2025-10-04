import express from "express";
import { getUsers , addUsers } from "../controllers/users.js";

const router = express.Router();

router.get('/', getUsers);

router.post('/addUser', addUsers);

export default router;
