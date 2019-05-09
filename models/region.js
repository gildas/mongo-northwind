import mongoose from "mongoose"

const RegionSchema = new mongoose.Schema({
  RegionID:   { type: Number, unique: true },
  RegionName: { type: String, unique: true },
})

RegionSchema.query.byName = function(name) { return this.where({ RegionName: new RegExp(name, 'i') }) }

export default mongoose.model('regions', RegionSchema)