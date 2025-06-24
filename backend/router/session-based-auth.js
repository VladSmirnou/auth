import express from 'express';
import { validationResult, checkSchema } from 'express-validator';
import { db } from '../db/db.js';
import bcrypt from 'bcrypt'
import { not } from '../utils/not.js';

export const sessionBasedAuthRouter = express.Router();

const emailPattern = /^[a-zA-Z0-9_-]{5,15}@gmail\.com$/;
const passwordPattern = /^[a-zA-Z0-9_!@#$%^&*()-]{8,20}$/;

export const checkIsAuthorized = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        return res.sendStatus(401)
    }
}

const checkIsLogin = (req, res, next) => {
    if (req.session.user) {
        return res.sendStatus(200)
    } else {
        next()
    }
}

const loginValidationSchemaConfig = {
    email: {
        matches: {
            options: [emailPattern]
        },
        errorMessage: "Invalid email format"
    },
    password: {
        matches: {
            options: [passwordPattern]
        },
        errorMessage: "Invalid password format"
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

const formatErrors = (errors) => {
    return Object.entries(errors.mapped()).map(([field, { msg: message }]) => {
        return {
            field,
            message
        }
    })
}

const pathValidationSchemaConfig = {
    '/login': loginValidationSchemaConfig,
    '/signup': signUpValidationSchemaConfig
}

const validationSchema = async (req, res, next) => {
    const schemaConfig = pathValidationSchemaConfig[req.route.path];

    await checkSchema(schemaConfig, ['body']).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatErrors(errors) })
    } else {
        next();
    }
}

sessionBasedAuthRouter.route('/signup')
    .post(validationSchema, async (req, res) => {
        const { username, password, email } = req.body;

        const user = await db.oneOrNone(`select 1 from users where email=$1 limit 1`, [email]);

        if (user) {
            return res.status(409).json({ message: 'User already exists' })
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);

            await db.none(`
                insert into users (username, password, email) values($1, $2, $3)
            `, [username, encryptedPassword, email]);
            return res.status(201).json({ message: 'created' });
        }
    });

sessionBasedAuthRouter.route('/login')
    .post(checkIsLogin, validationSchema, async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await db.one(`
                select id, username, password from users where email=$1`, [email]
            );

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (not(isPasswordValid)) {
                res.status(400).json({ message: 'invalid login or password' })
            }

            req.session.user = {
                id: user.id,
                username: user.username,
            }

            res.sendStatus(200);
        } catch (err) {
            return res.status(400).json({ message: 'invalid login or password' })
        }
    })
    .delete(checkIsAuthorized, (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.log('error during session removal process: ', err)
            }
        });
        res.clearCookie('sessionId');
        res.sendStatus(200);
    })