// models/Car.js
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

const carSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  make: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  pricePerDay: { 
    type: Number, 
    required: true 
  },
  location: {
    wilaya: { 
      type: String, 
      required: true, 
      enum: Wilayat // Fixed: Using the correct variable name
    },
    address: { 
      type: String, 
      required: true 
    }
  },
  images: [String], // Added missing images field
  availableDates: [{ type: Date }], // Added missing availableDates field
  amenities: [String],
  reviews: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    comment: { 
      type: String 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  totalRatings: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);