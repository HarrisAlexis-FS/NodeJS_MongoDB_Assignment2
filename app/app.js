const express = require ("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const heroRoutes = require("../api/routes/heroes");
const roleRoutes = require("../api/routes/roles");



//middleware for logging
app.use(morgan("dev"))
//parsing middleware- for the body that we send

app.use(express.urlencoded({
    extended: true
}));
//middleware to make all requests json
app.use(express.json());

//handle CORS - makes it so you can go from localhost3000 to AWS... or other different ports allows the sharing of resources
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*"); // * says everyone can use the API
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE");
    }
    next();
});




app.get("/", (req,res,next) =>{
    res.status(201).json({
        message: "Service is up",
        method: req.method
    })
});

app.use("/heroes", heroRoutes);
app.use("/roles", roleRoutes);






//middleware for errors and bad urls

app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req,res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

mongoose.connect(process.env.mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);

});

module.exports = app