import socket from 'socket.io';

declare module 'socket.io' {
  export interface Socket {
    user_id: string;
  }
}
