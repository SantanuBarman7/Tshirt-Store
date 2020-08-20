const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err , fields, file) =>{
        if(err){
            res.status(400).json({
                error: "problem with Image"
            })
        }
        //destructuring fields
        const {name, description, price, category, stock} = fields;


        // restriction field
        if(
            !name ||
            !description ||
            !price || 
            !category ||
            !stock
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }

        let product = new Product(fields)

        //handle file 
        if(file.photo){
            if(file.photo.size > 2097152/* 2 MB */){
                return  res.status(400).json({
                    error: "File Size should be less than 2MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType =file.photo.type
        }
        //console.log(product)
        //save to DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Saving tshirt to DB failed!!"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}
//middleware
exports.photo = (req,res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

//delete controller
exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Failed To delete This Product"
            })
        }
        res.json({
            messsage: "Deletion is Successfull"
        })
    })
}

//update controller
exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err , fields, file) =>{
        if(err){
            res.status(400).json({
                error: "problem with Image"
            })
        }
        //destructuring fields
        //const {name, description, price, category, stock} = fields;

        //updation code
        let product = req.product;
        product = _.extend(product, fields)

        //handle file 
        if(file.photo){
            if(file.photo.size > 2097152/* 2 MB */){
                return  res.status(400).json({
                    error: "File Size should be less than 2MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType =file.photo.type
        }
        //console.log(product)
        //save to DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Updation of product failed!!"
                })
            }
            res.json(product)
        })
    })
}

//product listing see product if error 
exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 //parseInt to convert the querry from string to int as most languages handle parameter as string 
    let sortBy =req.query.sortBy ? req.query.sortBy : "_id" 
    Product.find()
    .select("-photo")//exclude photo
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No Products Found!!"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category", {}, (err, category)=> {
        if(err){
            return res.status(400).json({
                error: "No categories found!!"
            })
        }
        res.json(category);
    })
}

//middleware stock sold
exports.updateStock = (req,res,next) => {

    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        } 
    })

    product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk Operation Failed!!"
            })
        }
        next()
    })

}

