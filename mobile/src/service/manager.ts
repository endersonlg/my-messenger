import { Manager } from 'socket.io-client';

import config from '../../config';

export const manager = new Manager(config.API_URL, {
  reconnectionDelayMax: 10000,
});
