require('dotenv').config();

const {
  PORT, DB_URI,
} = process.env;

if (!PORT) {
  throw Error('PORT not set. Check .env');
}

if (!DB_URI) {
  throw Error('DB_URI not set. Check .env');
}

const API_URL = 'https://bad-api-assignment.reaktor.com';
const HISTORY_URL = 'https://bad-api-assignment.reaktor.com/rps/history';
const WS_URL = 'ws://bad-api-assignment.reaktor.com/rps/live';
const WS_HOST_PATH = '/live';

export default {
  PORT,
  API_URL,
  HISTORY_URL,
  WS_URL,
  WS_HOST_PATH,
  DB_URI,
};
