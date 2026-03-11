const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}= require("../middleware.js")
const reviewControllers = require("../controllers/reviews.js")

//REVIEWS ADD ROUTE
//will be post route

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview))

//riute to delete review
router.delete("/:reviewId",isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview));

module.exports = router;