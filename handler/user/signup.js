
const crypto = require('crypto')
const connection = require('../../database/mysqlconnection')

module.exports.handler = async (event, context) => {

    const data = JSON.parse(event.body)
    const username = data.username
    const email = data.email
    const password = data.password

    let hashedPassword;
    if (!username && !password && !email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'all field is required' })

        }
    } else if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'email is required' })

        }
    } else if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'username is required' })

        }
    } else if (!password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'password is required' })

        }
    }


    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/;

    if (!emailRegex.test(email)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'email is invalid' })

        }
    }

    

    if (password.length < 8 || password.length > 12) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Password must be between 8 and 12 characters' })

        }
    } else if (!/[a-z]/.test(password)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Password must contain at least one lowercase letter" })

        }

    } else if (!/[A-Z]/.test(password)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Password must contain at least one uppercase letter" })

        }
    } else if (!/[\!@#\$\%^&\*\(\)\-\_\+=\{\}\[\]\\\|;:'",<\.>\/\?]/.test(password)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Password must contain at least one special character" })

        }

    } else {
    
        hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    }

    const sql = 'INSERT INTO userAuth (email, username, password) VALUES (?, ?, ?)';
    const sqlcheck = 'SELECT username, email FROM userAuth WHERE username = ? OR email = ?';
    try {
        const [result] =await connection.query(sqlcheck, [username, email])
        if (!result) {
       

            return {
               statusCode: 500,
                body: JSON.stringify({ message: err.message})

            }
        } else if (result.length > 0) {
           
            
            if (result[0].username === username) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Username already taken' })

                }
            }
            if (result[0].email === email) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Email address already registered' })

                }

                }
            } else {
            
                const [err]= await connection.query(sql, [email, username, hashedPassword])
    
                    if (err) {
                        console.log(err.message)
                        return {
                            statusCode: 400,
                            body: JSON.stringify({ message: 'Failed to Register' })
    
                        }
    
                    } else {
    
                        return {
                            statusCode: 200,
                            body: JSON.stringify({ message: 'User created successfully' })
    
                        }
    
                    }
    
            
        }
  
        
        
    }catch (error) {
        return {
     statusCode: 400,
     body: JSON.stringify({ error:error.message })
    }

}

}