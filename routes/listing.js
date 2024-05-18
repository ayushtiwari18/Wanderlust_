const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage } = require("../cloudconfig.js"); 
const upload = multer({storage});


router.route("/")              //index Route
     .get(wrapAsync(listingController.index))
     .post(                    //Create Route
      isLoggedIn,
      upload.single("listing[image]"),
      validateListing,
      wrapAsync(listingController.createListing)
   );

//New Route 
  router.get("/new" ,isLoggedIn,listingController.renderNewForm );

router.route("/:id") //Show Route 
      .get(wrapAsync(listingController.showListing))
      .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
       validateListing, //Update route
       wrapAsync(listingController.updateListing)
      ) //DELETE Route
      .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

  //Edit route
  router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.EditListing));
  
 

 
  
 

  module.exports = router;
  