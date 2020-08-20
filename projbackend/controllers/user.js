const User =require("../models/user");

const Order = require("../models/order");

//Params
exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err , user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req,res) => {
    //TODO: get back here for password
    req.profile.salt = undefined //hiding from browser
    req.profile.encry_password = undefined
    req.profile.__v = undefined
    return res.json(req.profile)
}

/*Assignment 1
exports.getAllUsers = (req,res) => {
    User.find().exec((err , users) => {
        if(err || !users){
            return res.status(400).json({
                erroe: "No Users Found"
            });
       }
       res.json(users)
    });
};*/

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err ,user ) => {
            if(err){
                return res.status(400).json({
                    erroe: "You are not authorised to update"
                })
            }
            user.salt = undefined //hiding from browser
            user.encry_password = undefined
            user.__v = undefined
            res.json(user);
        }
    );
};

exports.userPurchaseList = (req , res) =>{
    Order.find({user: req.profile._id})
    .populate((err,order) => {
        if(err){
            return res.status(400).json({
                error: "No orders found!"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = []
    req.body.order.products.forEach(products => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order. transaction_id
        })
    }) 

    //store this in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}}, //replace purchases with the new updated one
        {new: true}, //means from database send me the updated one
        (err,purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
            next()
        }
    )
}

