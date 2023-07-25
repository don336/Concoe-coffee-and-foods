import mongoose from 'mongoose';
// import { Schema } from 'mongoose';
const salesSchema = new mongoose.Schema({
  saleId: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // customerId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Customers",
  //   required: true,
  // },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model('Sales', salesSchema);
