import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
// import fs from 'fs';
// import path from 'path';
import { env } from '$env/dynamic/private';


// Read the CA certificate
if (!env.CA_CERTIFICATE) {
    throw new Error('Environment variable SSL_CERTIFICATE is not defined');
}

// const caCert = fs.readFileSync(path.resolve(env.SSL_CERTIFICATE)).toString();

const pool = new Pool({
    host: env.HOST,
    port: Number(env.PORT),
    database: env.DATABASE_NAME,
    user: env.USER,
    password: env.PASSWORD,
    ssl: {
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUa4dgVmj3dybk3ksNaDX1HaAUcUowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNTY4MTg1NmItNTFiNS00MjEzLWI0MmEtNWFlZWQ1NDcw
MGE1IFByb2plY3QgQ0EwHhcNMjMxMjA2MDk1ODExWhcNMzMxMjAzMDk1ODExWjA6
MTgwNgYDVQQDDC81NjgxODU2Yi01MWI1LTQyMTMtYjQyYS01YWVlZDU0NzAwYTUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALnjtngo
TXdebFYk2URDZGoo1pJZZAUfneEQQRYkaRhaEeSvE7/XgkjFTMxj2UtnJqiO7q/Z
5xkh3/KrYL5lGxOj99JjOY7BWIqaV9nlz/UbeLWUNTCrEbUVI+9eBzj2kos4grkX
rdDdYg1eciMOJxbPiRbsvWC4vPoyzGix4ikpnxcR/x8rqjiC6nmHALlQ0W5vgAQ+
jLTA+ME3WvKbsCtoJqG8ldvrkyoCfpeazQbbNPwusVbl4QZoL4ZUtfdR6NZqdFgp
8ijOB/OBs/+ZVxQDM1/E188AO8BObkaXMPDNMorB0d9wsT1s5QXwe67sqDnAyOCk
0l2JEDj/1G5IyMLqPhLFMjVj7X0Sb5NFoO2pTq2WSi4FpZppLBc5nEzX8qzuKCW1
n1mq7WgVipsvRWyqy2jBpityU0qT/A2LMl1oGWY7ZzkTur3MdtSrttv1nuWs8Ntr
gmtM1hR3S2V+Is3qgglNuO+EoZWFIJeRmrj1zDH5Orbyxa9kllFLBJtKRwIDAQAB
oz8wPTAdBgNVHQ4EFgQUQ2NFOPgHFPVLLM0gQ2BqSDiHAjUwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJnFzTuF/SBk5GqO
tKah/xly8HyczPGBLqKvxgkCK0JWysJwjhlQEAKakR7OiDbYr+l0ADe4q0rnxZTQ
3XloMYuyjZk6eK0kD226iiuG/sY0O8RvfQmq6SyhExJA2EPWi4hA3ufFP7FZhLN8
cwULHD3vX+azW/JDOvhfcuL6/6rV7WNlGppt9aZLOU0W6XpBwb/rl9+sSTwAvXie
618+COgoCbRRzuCUCPG7Eo8rbNuv/0MPmYeipgmqrDxLgL/eJPJaKQQbyQUfdmnU
K+/zVnNe74hQ3JXTns+Obp+DIFhn3NrSLgrLU8hsWUAll6X5mlX7KvRACB6YixE3
VesVy/+5pXNoLlrteeRLzYItHP18RbJDg4oDfD84uIwIONU1lUCUDmoXf83pdvzv
trqECG0jx4UeX6S1Jc1E+thUAmojQyfCI/bvmjP/k3F6tuJjWjLFPfMwyISAhSaR
RPorOfXb8vZcraLXCx2ravsbEX4J8Y1S4d0fn55z45zHiMEThg==
-----END CERTIFICATE-----`,
        rejectUnauthorized: true // ensure only trusted certs are accepted
    }
});

export const db = drizzle(pool);
