const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser =require("cookie-parser");
const cors= require("cors");

require('dotenv').config()

const express = require("express");

const app = express();

const authRoutes =require("./routes/auth.js")

const userRoutes = require("./routes/user.js")

const CategoryRoutes = require("./routes/category")

const productRoutes = require("./routes/product")

const OrderRoutes = require("./routes/order")

const stripeRoutes = require("./routes/stripepayment")

const paymentBRoutes = require("./routes/paymentBRoutes")



//Db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DB_CONNECTED");
});

//middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", productRoutes);
app.use("/api", OrderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);




//Port

const port = process.env.PORT | 8000; 

//Starting my server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})