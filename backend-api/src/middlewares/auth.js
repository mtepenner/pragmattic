const authenticate = (req, res, next) => {
  // Simulating authentication by expecting a User ID in the headers
  const userId = req.headers['x-user-id'];
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. Missing x-user-id header.' });
  }
  
  // Attach the user to the request object
  req.user = { id: userId };
  next();
};

module.exports = { authenticate };
