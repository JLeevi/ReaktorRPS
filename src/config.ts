require('dotenv').config();

const {
  PORT, API_URL, HISTORY_URL, WS_URL, WS_HOST_PATH,
} = process.env;

if (!PORT) {
  throw Error('PORT not set. Check .env');
}

if (!API_URL) {
  throw Error('API_URL not set. Check .env');
}

if (!HISTORY_URL) {
  throw Error('HISTORY_URL not set. Check .env');
}

if (!WS_URL) {
  throw Error('WS_URL not set. Check .env');
}

if (!WS_HOST_PATH) {
  throw Error('WS_HOST_PATH not set. Check .env');
}

export default {
  PORT,
  API_URL,
  HISTORY_URL,
  WS_URL,
  WS_HOST_PATH,
};
