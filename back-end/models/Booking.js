// File: models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rentalType: {
    type: String,
    enum: ['house', 'hotel', 'car'],
    required: true
  },
  rentalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // Using refPath to dynamically reference different models
    refPath: 'rentalModel'
  },
  rentalModel: {
    type: String,
    required: true,
    enum: ['House', 'Hotel', 'Car'],
    default: function() {
      // Set the model name based on rentalType
      const typeToModel = {
        'house': 'House',
        'hotel': 'Hotel',
        'car': 'Car'
      };
      return typeToModel[this.rentalType];
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'expired'],
    default: 'pending'
  },
  guests: {
    type: Number,
    default: 1
  },
  stripeSessionId: String,
  paymentId: String,
  paymentDate: Date,
  refundAmount: Number,
  refundId: String,
  cancelledAt: Date,
  notes: String
}, {
  timestamps: true
});

// Add indexes for frequent queries
BookingSchema.index({ user: 1, status: 1 });
BookingSchema.index({ rentalType: 1, rentalId: 1 });
BookingSchema.index({ startDate: 1, endDate: 1 });

// Method to check if dates overlap with existing booking
BookingSchema.statics.checkAvailability = async function(rentalType, rentalId, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const overlappingBookings = await this.find({
    rentalType,
    rentalId,
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      // New booking starts during an existing booking
      { startDate: { $lte: end }, endDate: { $gte: start } },
      // New booking contains an existing booking
      { startDate: { $gte: start, $lte: end } },
      // New booking ends during an existing booking
      { endDate: { $gte: start, $lte: end } }
    ]
  });
  
  return overlappingBookings.length === 0;
};

module.exports = mongoose.model('Booking', BookingSchema);