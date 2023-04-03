const db = require('../../database/mysqlconnection')
const authToken =require('../../util/authJwt')




module.exports.handler = async (event, context) => {


    try {
        const username = await authToken(event);
        if(username=='admin'){
            const results = await db.query('SELECT * FROM userAuth')
       
            return {
                statusCode: '200',
                body: JSON.stringify(results)
    
            }

        }
    
   

    }
      
 catch(err){
        return {
            statusCode: '400',
            body: JSON.stringify({message:err.message})

        }
    }
}


   







