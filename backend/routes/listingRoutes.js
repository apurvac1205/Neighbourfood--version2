import express from "express";

import {

createListing,

getActiveListings,

claimListing,

updateListing,

deleteListing,

getVendorListings

} from "../controllers/listingController.js";

const router = express.Router();

router.post("/", createListing);

router.get("/active", getActiveListings);

router.get("/vendor/:vendorName", getVendorListings);

router.post("/claim", claimListing);

router.put("/:id", updateListing);

router.delete("/:id", deleteListing);

export default router;