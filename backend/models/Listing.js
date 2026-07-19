import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
{
vendorName:{
type:String,
required:true
},

title:{
type:String,
required:true
},

description:{
type:String,
required:true
},

category:{
type:String,
default:"Meals"
},

price:{
type:Number,
default:0
},

expiry:{
type:String,
default:""
},

location:{
type:String,
default:""
},

image:{
type:String,
default:""
},

status:{
type:String,
enum:["available","claimed"],
default:"available"
},

confirmationCode:{
type:String,
default:null
}

},
{
timestamps:true
}
);

export default mongoose.model("Listing",listingSchema);