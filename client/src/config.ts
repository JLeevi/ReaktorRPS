const HOST =
  process.env.NODE_ENV === "production"
    ? window.location.origin
    : "http://localhost:3001";

const WS_HOST = HOST.replace(/^http/, "ws");
const WS_LIVE_RESULTS_URL = `${WS_HOST}/live`;

export default {
  WS_LIVE_RESULTS_URL,
};
