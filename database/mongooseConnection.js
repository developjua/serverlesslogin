const mongoose = require('mongoose');

let conn = null;

module.exports = connection= async()=>{


    try {
        await mongoose.connect(process.env.MONGODBURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        
       
        });
        console.log('Connected to database!');
      } catch (error) {
        console.error('Error connecting to database:', error);
      }
    };

 


