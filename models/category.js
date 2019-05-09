import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  CategoryID:   { type: Number, unique: true },
  CategoryName: { type: String, unique: true },
  Description:  { type: String },
  Picture:      { type: String },
  //field4
  //field5
  //field6
})

CategorySchema.query.byName = function(name) { return this.where({ CategoryName: new RegExp(name, 'i') }) }

export default mongoose.model('categories', CategorySchema)