import Listing from "../models/Listing.js";

// Create Listing
export const createListing = async (req, res) => {
  try {
    const {
      vendorName,
      title,
      description,
      category,
      price,
      expiry,
      location,
      image,
    } = req.body;
    
    if (
    !vendorName ||
    !title ||
    !description ||
    !category ||
    price === undefined ||
    !expiry ||
    !location ||
    !image
    ) {

return res.status(400).json({

message:"Please fill all the required fields."

});

}
    const listing = new Listing({

    vendorName: vendorName?.trim() || "",

    title: title?.trim() || "",

    description: description?.trim() || "",

    category,

    price,

    expiry: expiry?.trim() || "",

    location: location?.trim() || "",

    image: image?.trim() || ""

    });

    await listing.save();

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Active Listings
export const getActiveListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      status: "available",
    }).sort({
      createdAt: -1,
    });

    res.json(listings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Claim Listing
export const claimListing = async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.status === "claimed") {
      return res.status(400).json({
        message: "Already claimed",
      });
    }

    const code = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    listing.status = "claimed";
    listing.confirmationCode = code;

    await listing.save();

    res.json({
      success: true,
      confirmationCode: code,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Listing

export const updateListing = async (req, res) => {

try {

const updatedListing = await Listing.findByIdAndUpdate(

req.params.id,

req.body,

{

new: true,

runValidators: true

}

);

if (!updatedListing) {

return res.status(404).json({

message: "Listing not found"

});

}

res.json(updatedListing);

} catch (error) {

res.status(500).json({

message: error.message

});

}

};

// Delete Listing

export const deleteListing = async (req, res) => {

try {

const listing = await Listing.findById(req.params.id);

if (!listing) {

return res.status(404).json({

message: "Listing not found"

});

}

await listing.deleteOne();

res.json({

message: "Listing deleted successfully"

});

} catch (error) {

res.status(500).json({

message: error.message

});

}

};

// Get Vendor Listings

export const getVendorListings = async (req, res) => {

try {

const listings = await Listing.find({

vendorName: req.params.vendorName

}).sort({

createdAt: -1

});

res.json(listings);

} catch (error) {

res.status(500).json({

message: error.message

});

}

};