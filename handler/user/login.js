const jwtToken = require('../../util/jwtutil');
const crypto = require('crypto')
const connection = require('../../database/mysqlconnection')
 
 
module.exports.handler = async (event,context) => {
    const data = JSON.parse(event.body)
    const email = data.email
    const password = data.password



    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    try {
        const[results]= connection.query('SELECT username,email,password FROM userAuth WHERE email = ? AND password = ?', [email, hashedPassword])

        if (results.length === 0) {
              return {
                  statusCode: 400,
                  body:JSON.stringify({message:'User not found please signup' }),
                  headers:{
                      'Content-Type': 'application/json'
                  }
                }
              
          } else if (results[0].email !== email) {
              return {
                  statusCode: 400,
                  body:JSON.stringify({message:'Incorrect email' }),
                  headers:{
                      'Content-Type': 'application/json'
                  }
                }
          }
          else if (results[0].password !== hashedPassword) {
              return {
                 statusCode: 400,
                  body:JSON.stringify({message:'Incorrect password'}),
                  headers:{
                      'Content-Type': 'application/json'
                  }
                }
  
          } else {
              let jwttoken = await jwtToken(results[0].username)
                return {
                  statusCode: 200,
                  body:JSON.stringify({token:jwttoken.tokenval}),
                  headers:{
                      'Content-Type': 'application/json'
                  }
                }
  
          }
    } catch (error) {
        return {
            statusCode: 200,
            body:JSON.stringify({error:error.message}),
        
          }
    }

 
    }


