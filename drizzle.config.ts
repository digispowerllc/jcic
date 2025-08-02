import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import path from 'path';

const {
	HOST,
	PORT,
	DATABASE_NAME,
	USER,
	PASSWORD,
	CA_CERTIFICATE,
	DB_ENGINE
} = process.env;

if (!HOST || !PORT || !DATABASE_NAME || !USER || !PASSWORD || !DB_ENGINE) {
	throw new Error('❌ Missing required database environment variables for manual connection');
}
if (!CA_CERTIFICATE) {
	throw new Error('❌ CA_CERTIFICATE path is not set');
}

const caPath = path.resolve(process.cwd(), CA_CERTIFICATE);
const caCert = fs.readFileSync(caPath, 'utf-8');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: DB_ENGINE as 'postgresql' | 'mysql' | 'sqlite',
	dbCredentials: {
		host: HOST,
		port: Number(PORT),
		database: DATABASE_NAME,
		user: USER,
		password: PASSWORD,
		ssl: {
			rejectUnauthorized: true,
			ca: caCert
		}
	},
	verbose: true,
	strict: true
});
