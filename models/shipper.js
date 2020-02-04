import mongoose from 'mongoose'

const ShipperSchema = new mongoose.Schema({
  ShipperID:   { type: Number, unique: true },
  CompanyName: { type: String },
  Phone:       { type: String },
})

export default mongoose.model('shippers', ShipperSchema)