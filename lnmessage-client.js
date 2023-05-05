import * as crypto from 'crypto';
import Lnmessage from 'lnmessage';

const NODE_PUBKEY = '';
const WS_PORT = 5000;
const NODE_IP = '';
const RUNE = '';
const CALL_FREQUENCY = 0.2 * 1000 // Seconds

const ln = new Lnmessage({
  remoteNodePublicKey: NODE_PUBKEY,
  wsProxy: `ws://${NODE_IP}:${WS_PORT}`,
  ip: NODE_IP,
  port: WS_PORT,
  privateKey: crypto.randomBytes(32).toString('hex'),
  logger: { info: console.log, warn: console.warn, error: console.error }
})
console.warn('Initializing LnMessage');
await ln.connect();
console.warn('Connected');

setInterval(() => {
  ln.commando({ method: 'getinfo', params: [], rune: RUNE });
  ln.commando({ method: 'listpeers', params: [], rune: RUNE });
  ln.commando({ method: 'listinvoices', params: [], rune: RUNE });
  ln.commando({ method: 'listsendpays', params: [], rune: RUNE });
  ln.commando({ method: 'listfunds', params: [], rune: RUNE });
  ln.commando({ method: 'bkpr-listaccountevents', params: [], rune: RUNE });
  ln.commando({ method: 'feerates', params: ['perkb'], rune: RUNE });
}, CALL_FREQUENCY);
