import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './router/auth.js';
import { cardsRouter } from './router/cards.js';

import { print } from './utils/print.js';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    print(`method: ${req.method}; ${fullUrl}`);
    next()
})

app.use('/auth', authRouter);
app.use('/cards', cardsRouter);

app.listen(
    PORT,
    HOST,
    () => print(`server is listening on ${PORT}`)
)
