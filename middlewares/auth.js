const jwt = require("jsonwebtoken");

console.log("authorisation");

const auth = (req, res, next)  => {

  // Verify if is there is a token
  const authHeader = req.headers.authorization;

  // If header not on right format
  if ( !authHeader?.startsWith('Bearer ') ) { return res.status( 401 ).json({'error': 'No authHeader'});}
    
  const token = authHeader.split(" ")[1];

  // Decode Token to extract userId
  jwt.verify(
    token,
    process.env.JWT_KEY,
    ( err, decoded ) =>{
          
      if (err) {

        return res.status( 403 ).json({ 'error':'Token expired or invalid' });

      } else {
        req.auth = {userId: decoded.userId, role: decoded.role};
        console.log(req.auth);
        next();
      }
    }
  )
}

module.exports = auth;
