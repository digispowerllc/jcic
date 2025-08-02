import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { env } from '$env/dynamic/private';


// Read the CA certificate
if (!env.SSL_CERTIFICATE) {
    throw new Error('Environment variable SSL_CERTIFICATE is not defined');
}

const caCert = fs.readFileSync(path.resolve(env.SSL_CERTIFICATE)).toString();

const pool = new Pool({
    host: env.HOST,
    port: Number(env.PORT),
    database: env.DATABASE_NAME,
    user: env.USER,
    password: env.PASSWORD,
    ssl: {
        ca: caCert,
        rejectUnauthorized: true // ensure only trusted certs are accepted
    }
});

export const db = drizzle(pool);
