const jwt = require('jsonwebtoken')


const jwtToken = async (tokenvalue) => {
    const token = await tokenvalue ;
    const tokenval = jwt.sign({ username: token}, process.env.SECRET, { expiresIn: '5m' });
    return tokenval

}



module.exports =  jwtToken ;