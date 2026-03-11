if(process.env.NODE_ENV != "production")
{
require('dotenv').config() // or import 'dotenv/config' if you're using ES6
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
//acquiring review model
const Review = require("./models/reviews.js");
const session = require("express-session");
//requiring mongostore 
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
//requiring passport 
const passport = require("passport");
const localStratergy = require("passport-local");
const User = require("./models/user.js");

//using listing.js
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


//connecting express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));




const dbURL = process.env.ATLAS_DB;
main()
    .then((res) => {
        console.log("connection successfull");
    })
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(dbURL);
}
//mongotore

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});
store.on("error",(err)=>{
    console.log("error in mongo session store",err)
});

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new localStratergy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// make currUser available in all templates
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



//page if no respose found
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!!"));
});

//middlewares to handle errors
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong !!" } = err;
    // res.status(statusCode).send(message)
    res.status(statusCode).render("error.ejs", { err, message });
});
app.get("/", (req, res) => {
    res.redirect("/listings");
});
//server
app.listen(8080, () => {
    console.log("server is listening to port 8080");
})

