import { db } from '../db/db.js';
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { not } from '../utils/not.js';
import { validationResult, checkSchema } from 'express-validator';

const refreshTokenCookieKey = 'refreshToken';

export const authRouter = express.Router();

export const authenticate = (req, res, next) => {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
        return res.status(401).json({ error: 'no authorization header' });
    }

    const bearer = accessToken.split(' ')[1];

    if (!bearer) {
        return res.status(401).json({ error: 'access token is empty' })
    }

    jwt.verify(bearer, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({error: 'expired or invalid access token'});

        req.userId = user.id;
        next();
    });
}

const generateTokens = (user) => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: jwt.sign(
            user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20s' })
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
}

authRouter.get('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ error: 'refresh token cookie is missing' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            db.none(
                `delete from auth where refresh_token=$1`,
                [refreshToken]
            ).finally(() => {
                res.clearCookie(refreshTokenCookieKey);
                res.status(403).json({ error: 'expired or invalid refresh token' });
            })
        } else {
            const { id } = user;
            db.oneOrNone(`select * from users where id=$1`, [id])
                .then(user => {
                    if (user) {
                        const accessToken = generateAccessToken({
                            id: user.id, username: user.username
                        });
                        res.status(200).json({ accessToken });
                    } else {
                        res.clearCookie(refreshTokenCookieKey);
                        res.status(400).json({ error: 'user doesn\'t exist' });
                    }
                })
        }
    })
})

const loginValidationSchemaConfig = {
    email: {
        isEmail: {
            errorMessage: 'Must be a valid email address.'
        }
    },
    password: {
        isLength: {
            options: {
                min: 8,
                max: 40
            },
            errorMessage: 'Invalid password length, must be min 8 and max 40 characters long.'
        }
    },
}

const signUpValidationSchemaConfig = {
    ...loginValidationSchemaConfig,
    username: {
        trim: true,
        notEmpty: {
            errorMessage: 'Username cannot be empty'
        },
        isLength: {
            options: {
                max: 20
            },
            errorMessage: 'Username cannot be longer that 20 characters'
        }
    }
}

const pathValidationSchemaConfig = {
    '/login': loginValidationSchemaConfig,
    '/signup': signUpValidationSchemaConfig
}

const formatErrors = (errors) => {
    return Object.entries(errors.mapped()).map(([field, { msg: message }]) => {
        return {
            field,
            message
        }
    })
}

const validateSubmittedAuthData = async (req, res, next) => {
    const schemaConfig = pathValidationSchemaConfig[req.route.path];

    await checkSchema(schemaConfig, ['body']).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatErrors(errors) })
    } else {
        next();
    }
}

authRouter.post('/signup', validateSubmittedAuthData, async (req, res) => {
    const { email, username, password } = req.body;

    const userEmail = await db.oneOrNone(
        `select email from users where email=$1`, [email], event => {
            return event?.email
        }
    );

    if (userEmail) {
        return res.status(409).json({
            error: 'User already exists'
        })
    }

    const hasherPassword = await bcrypt.hash(password, 10);

    await db.none(
        `insert into users (email, username, password) values($1, $2, $3)`, [
            email,
            username,
            hasherPassword
        ]
    );

    return res.status(201).json({ message: 'created' });
});

authRouter.route('/login')
    .post(validateSubmittedAuthData, async (req, res) => {
        const userData = req.body;

        const { email, password } = userData;

        try {
            const user = await db.one(
                `select id, email, username, password from users where email=$1`,
                [email]
            );

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (not(isPasswordValid)) {
                return res.status(401).json({ error: 'Invalid login or password' })
            }

            const userId = user.id;

            const tokenPayload = { id: userId, username: user.username };
            const { accessToken, refreshToken } = generateTokens(tokenPayload);

            await db.none(
                `insert into auth (user_id, refresh_token) values($1, $2) on conflict (user_id) do update set refresh_token=$2`,
                [userId, refreshToken]
            )

            res.cookie(
                refreshTokenCookieKey,
                refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 20000,
                }
            );

            return res.status(200).json({ accessToken });

        } catch (error) {
            return res.status(401).json({error: 'Invalid login or password'})
        }
    })
    .delete(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: 'refresh token is not set' });
        }

        await db.none(
            `delete from auth where refresh_token=$1`,
            [refreshToken]
        );
        res.clearCookie(refreshTokenCookieKey);
        return res.sendStatus(200);
    })
    .get(authenticate, async (req, res) => {
        return res.sendStatus(200);
    })
