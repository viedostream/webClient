export const environment = {
  production: true,
  API_ENDPOINT: "https://api.viedo.io/",
  ZIXO_ENDPOINT: "https://api.zixo.io/test/",
  PEERJS_CONFIG: {
    host: "peer.koalament.io",
    secure: true,
    port: 443,
    path: '/peerjs',
    debug: 3,
    config: {
      'iceServers': [
        { 'url': 'stun:stun.l.google.com:19302' }
      ]
    }
  },
  STREAM_CONFIG: {
    INVOICE_PRICE: 5000,
    DURATION_SECONDS: 5,
    CHANNEL_PRICE: 50000,
    CHANNEL_LOCK_SECONDS: 600
  }
};
