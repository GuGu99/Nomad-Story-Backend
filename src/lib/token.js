import dotenv from 'dotenv';
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

jwt.sign({ foo: 'bar' }, 'secret-key', { expiresIn: '7d' }, (err, token) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(token);
});

// export const generateToken = (payload) => {
//     return new Promise(
//         (resolve, reject) => {
//             jwt.sign(
//                 payload,
//                 jwtSecret,
//                 {
//                     expiresIn: '7d'
//                 }, (error, token) => {
//                     if(error) reject(error);
//                     resolve(token);
//                 }
//             );
//         }
//     );
// };