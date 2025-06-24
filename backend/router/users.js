import express from 'express';
import { db } from '../db/db.js';

export const usersRouter = express.Router();

usersRouter.route('/')
    .get(async (req, res) => {
        const users = await db.manyOrNone(`select username, email from users`);
        return res.status(200).json({ users: users ?? [] })
    })