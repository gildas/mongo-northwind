import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  ProductID:       { type: Number, unique: true },
  ProductName:     { type: String, unique: true },
  SupplierID:      { type: Number },
  CategoryID:      { type: Number },
  QuantityPerUnit: { type: String },
  UnitPrice:       { type: Number },
  UnitsInStock:    { type: Number },
  UnitsOnOrder:    { type: Number },
  ReorderLevel:    { type: Number },
  Discontinued:    { type: Number },
})

ProductSchema.query.byName = function(name) { return this.where({ ProductName: new RegExp(name, 'i') }) }

export default mongoose.model('products', ProductSchema)