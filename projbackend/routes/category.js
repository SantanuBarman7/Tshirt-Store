var express = require("express")
var router = express.Router()

const { getCategoryById , createCategory,  getAllCategory, getCategory, updateCategory, removeCategory} = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

//actual routes goes here (update=router.put ,retriving from DB =get ,delete =delete)

//create routes
router.post("/category/create/:userId", isSignedIn , isAuthenticated , isAdmin , createCategory)
//read routes
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

//update route
router.put("/category/:categoryId/:userId", isSignedIn , isAuthenticated , isAdmin , updateCategory)

//delete route
router.delete("/category/:categoryId/:userId", isSignedIn , isAuthenticated , isAdmin , removeCategory)

module.exports =router;