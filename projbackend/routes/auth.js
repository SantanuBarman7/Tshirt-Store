var express = require("express")
var router = express.Router()
const { check , validationResult } = require('express-validator')

const {signout,signup,signin,isSignedIn} =require("../controllers/auth.js")

//signup validation

router.post("/signup",[
    check('name','name should be atleast 3 characters').isLength({ min:3 }),
    check('email','Email is required').isEmail(),
    check('password','password should be atleast 3 char').isLength({ min:3 })
] ,signup)


router.post("/signin",[
    check('email','Email is required').isEmail(),
    check('password','password field is required').isLength({ min:3 })
] ,signin)

router.get("/signout", signout)

router.get("/testroute", isSignedIn , (req,res) => {
    res.json(req.auth)
})

module.exports = router;
