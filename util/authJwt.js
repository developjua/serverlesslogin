const jwt = require('jsonwebtoken');

  module.exports = authToken = (event) => {
    return new Promise((resolve, reject) => {
      const token = event.headers.authorization.split(' ')[1];
  
      jwt.verify(token,process.env.SECRET,(err, decoded) => {
          if (err) {
            console.log('Error verifying JWT token:', err);
            if(reject(err)){
            return {
              statusCode: 400,
              body: JSON.stringify({message:'Token expired'})
            }
          }
            
          } else {
            console.log('Decoded JWT token:', decoded);
            resolve();
            return username = decoded.username
            
          }
        
        
        }
      );
    });
  };
















