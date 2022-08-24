const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
  food: {
    type: String,
    required: true
  },
  description: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Meal', mealSchema)