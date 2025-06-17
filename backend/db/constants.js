export const dsn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

// export const dsn = {
//   host: '127.0.0.1',
//   port: 5432,
//   database: 'maindb',
//   user: 'postgres',
//   password: 'mysecretpassword'
// };
