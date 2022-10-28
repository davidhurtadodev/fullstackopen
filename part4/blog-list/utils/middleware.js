const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (request, response, next) => {
  console.log(request.method);
  if (request.method === 'POST' || request.method === 'DELETE') {
    const { token } = request;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const user = {
      username: decodedToken.username,
      id: decodedToken.id,
    };
    console.log(user);
    request.user = user;
  }
  next();
};

module.exports = { tokenExtractor, userExtractor };
