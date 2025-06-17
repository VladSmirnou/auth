import pgp from 'pg-promise';
import { dsn } from './constants.js';

const pg = pgp();

export const db = pg(dsn);

db.task(async t => {

    // await t.none(`drop table if exists users cascade`);
    // await t.none(`drop table if exists auth cascade`);
    // await t.none(`drop table if exists cards cascade`);

    await t.none(
        `create table if not exists users (
            id serial primary key,
            username varchar(100) not null,
            email varchar(50) unique not null,
            password text not null
        )`
    );
    await t.none(
        `create table if not exists auth (
            user_id int primary key,
            refresh_token text not null,
            foreign key (user_id) references users(id) on delete cascade
        )`
    )
    await t.none(
        `create table if not exists cards (
            id serial,
            user_id int,
            title varchar(50),
            description text,
            scr text,
            primary key (id, user_id),
            foreign key (user_id) references users(id) on delete cascade
        )`
    )
})
.then(() => console.log('tables created successfuly'))
.catch(err => console.log('error during table creation process', err))
