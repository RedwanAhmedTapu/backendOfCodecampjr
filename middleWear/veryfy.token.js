  const veryfyToken=function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    console.log(req.headers.authorization);
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({error:"wrong token"});
      }
  
      // If the token is valid, set the user information in the request object
      req.user = decoded;
      next();
    });
  }

  module.exports=veryfyToken;