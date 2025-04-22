// models/Hotel.js
const mongoose = require('mongoose');

const Wilayat = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa",
  "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa",
  "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel",
  "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
  "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès",
  "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
  "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
  "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
  "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet",
  "El M'Ghair", "El Menia"
];

const hotelSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  location: {
    wilaya: { 
      type: String, 
      required: true,
      enum: Wilayat // Fixed: Using enum for validation instead of 'num'
    },
    address: { 
      type: String, 
      required: true 
    }
  },
  description: String,
  amenities: [String],
  pricePerNight: { 
    type: Number, 
    required: true 
  },
  roomsAvailable: { 
    type: Number, 
    default: 1 
  },
  images: [String],
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  totalRatings: { 
    type: Number, 
    default: 0 
  },
  reviews: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    comment: String,
    rating: { 
      type: Number, 
      required: true, 
      min: 0, 
      max: 5 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);