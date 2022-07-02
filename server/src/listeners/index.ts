// import { Server, Socket } from 'socket.io';
// import { verify } from 'jsonwebtoken';

// export function initListeners(io: Server): void {
//   const array = [];
//   // io.use(function (socket, next) {
//   //   console.log('aqui');
//   //   console.log(socket.handshake);
//   //   // if (socket.handshake.query && socket.handshake.query.token) {
//   //   //   verify(
//   //   //     // @ts-expect-error:ignora
//   //   //     socket.handshake.query.token,
//   //   //     process.env.APPLICATION_JWT_SECRET,
//   //   //     // eslint-disable-next-line consistent-return
//   //   //     (err, decoded): unknown => {
//   //   //       if (err) return next(new Error('Authentication error'));
//   //   //       // @ts-expect-error:ignora
//   //   //       // eslint-disable-next-line no-param-reassign
//   //   //       socket.decoded = decoded;
//   //   //       next();
//   //   //     },
//   //   //   );
//   //   // } else {
//   //   //   next(new Error('Authentication error'));
//   //   // }
//   // })
//   io.use((socket, next) => {
//     const { token } = socket.handshake.auth as Auth;
//     if(!token){
//       //voltar
//     }
//     try{
//       c
//     }catch{
//       //retornar error
//     }
//   });

//   io.sockets.on('connection', function (socket) {
//     // Connection now authenticated to receive further events
//     console.log('chegou');
//     socket.on('send message', (message) =>
//       // io.emit('message', message);
//       console.log('chegou 2');
//     });
//   });
// }
