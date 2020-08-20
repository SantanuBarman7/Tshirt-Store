const Category =  require("../models/category")

exports.getCategoryById = (req,res,next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.Category = category
        next();
    })
}

exports.createCategory = (req,res) =>{
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
                
            })
        }
        res.json({ category });
    })
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };

exports.getCategory= (req, res ) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "No Categories found"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory =(req,res) => {
    const category = req.Category //categoty can be used because of the middleware getCategoryById's category
    category.name = req.body.name; //grabing category name from front end
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req,res) => {
    const category =req.Category;
    category.remove((err,category) =>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete "+ category.name +" category"
            })
        }
        res.json({
            message: "Successfully removed  "+ category.name +" category"
        })
    })
}