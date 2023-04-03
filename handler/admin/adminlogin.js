const crypto = require('crypto');
const pool = require('../../database/mysqlconnection');
const jwtToken = require('../../util/jwtutil')

module.exports.handler = async (event, context) => {
    try {
        const data = JSON.parse(event.body)
        let username;
        let password;
        if (data == null) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'all field is required' })

            }
        } else {
            username = data.username
            password = data.password
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const [result] = await pool.query('SELECT * FROM admin WHERE username = ? and password = ?', [username, hashedPassword])

        if (result.length === 0) return { statusCode: 400, body: JSON.stringify({ message: 'invalid crediantial' }) }

        const tokenjwt = await jwtToken(result[0].username)
        return {
            statusCode: 200,
            body: JSON.stringify({ token: tokenjwt })
        }



    } catch (error) {
        return {
            statusCode: '400',
            body: JSON.stringify({ error: error.message })
        }

    }


























    /*      try{
              const value= await adminAuth(username,hashedPassword)
              if(value.length === 0){
                 return{
                     statusCode:400,
                     body:'invalid crediantial'
                 }
              }
               return {
                 statusCode: 200,
                 body: JSON.stringify({value})
             }
         } catch (error) {
             return {
                 statusCode: 400,
                 body: JSON.stringify({error: error.message})
             }
             
         }
  */
    /*    const results = await connection.query('SELECT * FROM admin WHERE username = ? and password = ?', [username, hashedPassword])*/
    /*  try{
        await adminAuth(username,hashedPassword)
     } */


}

