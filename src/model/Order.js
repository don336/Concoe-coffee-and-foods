import mongoose from "mongoose";

const orderSchema = new mongoose.connect({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orderItems: {
    type: [],
  },
  orderTotal: {
    type: Number,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model("Order", orderSchema);
