const mongoose = require("mongoose")

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
    
  },
  title: {
    type: String,
    
  },
  address: {
    type: String,
    
  },
  photos: {
    type: [String],
    
  },
  description: {
    type: String,
    
  },
  perks: {
    type: [String],
    
  },
  extrainfo: {
    type: String,
    
  },
  checkIn: {
    type: Number,
    
  },
  checkOut: {
    type: Number,
    
  },
  maxGuests: {
    type: Number,

  },
  

})

module.exports = mongoose.model("Place", PlaceSchema);