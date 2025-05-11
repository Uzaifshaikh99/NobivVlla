const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudeConfig.js")
const upload = multer({ storage })



// compact way 
//
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isloggedIn,validatelisting, upload.single('image'), wrapAsync(listingController.createListing))
    



//new route
router.get("/new",isloggedIn,listingController.rendernewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing ))
    .put(isloggedIn,isOwner,upload.single('image'),validatelisting,  wrapAsync(listingController.updateListing))
    .delete(isloggedIn,isOwner, wrapAsync(listingController.destroyListing ))





// //Index route
// router.get("/",wrapAsync(listingController.index));

// //new route
// router.get("/new",isloggedIn,listingController.rendernewForm);

// //show route
// router.get("/:id",wrapAsync(listingController.showListing ));

// //create route
// router.post("/",isloggedIn,validatelisting, wrapAsync(listingController.createListing));


//edit route
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync( listingController.renderEditForm ));

// //update route
// router.put("/:id",isloggedIn,isOwner,validatelisting,  wrapAsync(listingController.updateListing));

// //delete route
// router.delete("/:id",isloggedIn,isOwner, wrapAsync(listingController.destroyListing ));


module.exports = router;