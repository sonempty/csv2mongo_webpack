'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CSVSchema = new Schema({
  'Created at': { type: String, trim: true },
  'Price per Unit': { type: String, trim: true },
  'Unit': { type: String, trim: true },
  'Total Price': { type: String, trim: true },
  'Description': { type: String, trim: true }
})

module.exports = mongoose.model('CSVData', CSVSchema)
