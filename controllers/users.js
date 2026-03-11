const User = require("../models/user");


module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup.ejs");
};

// post route to save signup deatils
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.logIn(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welocme to Wanderlust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

//render login forn
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
        req.flash("success", "Welocme to Wanderlust");
        let redirectUrl =res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl);
    };

//logout route 
module.exports.logout =  (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Sucessfully!");
        res.redirect("/listings");
    })
};