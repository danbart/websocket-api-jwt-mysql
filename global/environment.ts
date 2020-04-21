import { resolve } from 'path';
import {config} from 'dotenv';

config({path: resolve(__dirname, "../../.env")});

export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 5000;

// variables de servidor

export const SERVER_HOSTNAME: string = process.env.DB_HOST || 'localhost';

export const SERVER_USER: string = process.env.DB_USER || 'root';

export const SERVER_PASSWORD: string = process.env.DB_PASS || '';

export const SERVER_DATABASE: string = process.env.DB_DATABASE || 'database';
