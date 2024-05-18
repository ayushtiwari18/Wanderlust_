const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams:true});
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const listingController = require("../controllers/reviews.js");
//Reviews
//Post ROute
router.post("/" ,isLoggedIn,validateReview, wrapAsync(listingController.createReview));
 
 // Delete Review Route
 router.delete("/:reviewId",isLoggedIn, isReviewAuthor,wrapAsync(listingController.destroyReview)
 );

 module.exports = router;