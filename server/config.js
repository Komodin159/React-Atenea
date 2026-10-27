import dns from 'node:dns';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
  quiet: true,
});

const dnsServers = (process.env.DNS_SERVERS || '')
  .split(',')
  .map((servidor) => servidor.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

export const MONGODB_URI = process.env.MONGODB_URI?.trim();
export const PORT = Number(process.env.PORT) || 5000;
export const JWT_SECRET = process.env.JWT_SECRET;
