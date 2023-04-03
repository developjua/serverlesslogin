
const News = require('../../models/news')
const connection = require('../../database/mongooseConnection')
const authToken = require('../../util/jwtutil')
module.exports.handler = async(event,context)=>{
    
  try{
    await connection()
    const username = await authToken(event)
if(username =='admin'){
  const news = await News.find()

  return {
      statusCode: '200',
      body: JSON.stringify(news)
  
  }
}

  } catch(err){
    return {
      statusCode: '400',
      body: JSON.stringify({error: err.message})
    }
  }
}