const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js")

//signup routes get and post
router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


//login routes
router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
        userController.login)

//logout route
router.get("/logout", userController.logout)



// //signup user get
// router.get("/signup", userController.renderSignupForm)

// //signup user post req
// router.post("/signup", wrapAsync(userController.signup))

// //login ur user
// router.get("/login", userController.renderLoginForm)

// //login post request

// router.post("/login", saveRedirectUrl, passport.authenticate("local",
//     {
//         failureRedirect: "/login",
//         failureFlash: true
//     }),
//     userController.login)





module.exports = router;