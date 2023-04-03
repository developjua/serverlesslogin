const News = require('../../database/mongooseConnection')
const authToken = require('../../util/authJwt')

module.exports.handler = async (event,context) => {


  const formData = {};

  event.body.split('--').forEach((part) => {
    const match = /name="(.*)"\r\n\r\n(.*)\r\n/.exec(part);
    if (match && match.length === 3) {
      formData[match[1]] = match[2];
    }
  });
  console.log(formData)

  const {title, description, category} = formData

  if (!title && !description && !category ) {
    return {
      statusCode: 400,
      body:JSON.stringify({ message: 'title, description, category fields are required'})
    }
  } else if (!title) {
    return {
      statusCode: 400,
      body:JSON.stringify({ message: "Title is required" })
    }
  } else if (!category) {
    return {
      statusCode: 400,
      body:JSON.stringify({ message: "category is required"})
    }
  } else if (!description) {
    return {
      statusCode: 400,
      body:JSON.stringify({  message: "descriton is required"})
    }
  }

  try {
    const username = await authToken(event)
    if (username === 'admin') {
      const exits = await News.findOne({ title })
      if (exits) {
        return {
          statusCode: 400,
          body:JSON.stringify({  message: 'This post title is already present' })
        }
      }

      const news = new News({ title, category, description });
      await news.save()
      return {
        statusCode: 200,
        body:JSON.stringify({ message: 'Succesfully created' })
      }
    
    } else {
      return {
        statusCode: 402,
        body:JSON.stringify({ message: 'your unauthorized to post' })
      }
    }
  }
  catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body:JSON.stringify({ message: 'Failed to create news article'  })
    }
  }
}


