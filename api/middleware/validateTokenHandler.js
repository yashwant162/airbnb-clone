const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
  const bearerHeader = req?.header["authorization"] ?? req?.cookies
  console.log("was i here?")
  console.log("cookie", bearerHeader)
  
  if (typeof bearerHeader !== "undefined"){
    let token = bearerHeader?.Token;
    console.log("Token: ", token)
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if(err){
        res.status(401);
        throw new Error("User is not Authorized");
      }
      console.log("decoded: ",decoded);
      req.user = decoded;
      console.log(req.user);
      next();
    })

  } else {
    res.status(401)
    throw new Error("User is not Authorized or token is missing")
  }

}

module.exports = { validateToken }