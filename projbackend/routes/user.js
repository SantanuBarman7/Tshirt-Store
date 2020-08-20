const express = require("express")
const router = express.Router()

const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth")
const {getUser, getUserById, updateUser , userPurchaseList} = require("../controllers/user")

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn ,isAuthenticated, getUser) // isSignedIn is before then isAuthenticated
router.put("/user/:userId",isSignedIn,isAuthenticated, updateUser)
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)

//Assignment 1 router.get("/users", getAllUsers);

module.exports =router;