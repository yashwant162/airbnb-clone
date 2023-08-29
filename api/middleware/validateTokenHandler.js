const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
  const bearerHeader = req?.header["authorization"] ?? req?.cookies
  console.log("was i here?")
  console.log("cookie", bearerHeader)
  
  if (typeof bearerHeader.Token !== "undefined" && bearerHeader.Token !== 'undefined' ){
    let token = bearerHeader?.Token;
    console.log("Token: ", token)
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
      // console.log("before err")
      if(err){
        // console.log("inside err")
        if(token){
          res.cookie("Token",'undefined')
        }
        res.status(401);
        throw new Error("User is not Authorized");
      }
      console.log("decoded: ",decoded);
      req.user = decoded;
      console.log(req.user);
      next();
    })

  } else {
    console.log("No User logged in going next")
    res.status(201).json(null)
    // next()
    // res.status(200)
    // throw new Error("User is not Authorized or token is missing")
  }

}

module.exports = { validateToken }