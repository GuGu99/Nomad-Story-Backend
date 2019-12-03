const jwt = require('jsonwebtoken');

export const generateToken = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d"}, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

export const decodedToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error){
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};