import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Read the CA certificate
if (!process.env.SSL_CERTIFICATE) {
    throw new Error('Environment variable SSL_CERTIFICATE is not defined');
}

const caCert = fs.readFileSync(path.resolve(process.env.SSL_CERTIFICATE)).toString();

const pool = new Pool({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
        ca: caCert,
        rejectUnauthorized: true // ensure only trusted certs are accepted
    }
});

export const db = drizzle(pool);
