import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { authRouter } from './router/auth.js';
import { cardsRouter } from './router/cards.js';
import { sessionBasedAuthRouter } from './router/session-based-auth.js';
import { print } from './utils/print.js';
import { usersRouter } from './router/users.js';
import connectPgSimple from 'connect-pg-simple';
import { db } from './db/db.js';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

const sessionOptions = {
    store: new (connectPgSimple(session))({
        pgPromise: db,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        sameSite: 'strict'
    }
}

app.use(express.json());
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(cors(corsOptions));

app.use((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    print(`method: ${req.method}; ${fullUrl}`);
    next()
})

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/sessionBasedAuth', sessionBasedAuthRouter)

app.listen(
    PORT,
    HOST,
    () => print(`server is listening on ${PORT}`)
)
