// models/House.js
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

const houseSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
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
  description: { 
    type: String 
  },
  pricePerNight: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Apartment', 'Villa', 'Cabin', 'Studio', 'Townhouse', 'Duplex'], 
    required: true 
  },
  images: [String],
  availableDates: [{ type: Date }],
  guestsAllowed: { 
    type: Number, 
    default: 1 
  },
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
  amenities: [String],
  reviews: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    comment: { 
      type: String 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('House', houseSchema);