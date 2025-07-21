const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ip: String,
  userAgent: String
})

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  stats: [statsSchema]
})

module.exports = mongoose.model('Url', urlSchema)
