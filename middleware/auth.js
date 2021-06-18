const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGM4ZTUzNTU3Y2VkNDM3NmM3M2IyNmEiLCJpYXQiOjE2MjM4NDEzMDQsImV4cCI6MTYyMzkyNzcwNH0.id-RqjdpjYBgujJyn_RYDQxjMT08pKnuoat4vWLyMew');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};