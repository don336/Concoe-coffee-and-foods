import mongoose from "mongoose";

const invoiceSchema = new mongoose.connect({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Invoice", invoiceSchema);
