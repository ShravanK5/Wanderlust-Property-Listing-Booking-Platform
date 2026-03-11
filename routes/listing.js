const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js")
const multer = require('multer')
//reqyireing cloudinray and stirage
const { storage } = require("../cloudconfig.js")
const upload = multer({ storage })

//listings
//create route 
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// new route form
router.get("/new", isLoggedIn, listingController.renderNewForm);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//search route
router.get("/", async (req, res) => {
    let { category } = req.query;

    let allListings;

    if (category) {
        allListings = await Listing.find({ category: category });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index", { allListings });
});

//update route
//delete route 
//show route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));






// //listings
// router.get("/", wrapAsync(listingController.index))


// // create listing post route
// //create route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//update route
//after clicking update changes method api to update the changes
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//AFTER CLICKING DELETE BUTTON
//delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


// //show route
// router.get("/:id", wrapAsync(listingController.showListing));

module.exports = router;