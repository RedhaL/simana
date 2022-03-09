const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


  // if user is authenticated the redirected to next page else redirect to login page
  const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log()
      return next()
    } else {
      res.redirect('/')
    }
  }

  // if user is authenticated and going to login page then redirected to home page if not authenticated redirected to login page  .
  const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/log');
    }
  }

  module.exports = verifyToken;
  module.exports = ensureAuth;
  module.exports = ensureGuest;
