import { Schema, model } from 'mongoose';

const salesSchema = new Schema({
  saleId: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,

    unique: true, // Ensure order numbers are unique
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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

// Define a pre-save middleware to automatically generate the orderNumber
salesSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next(); // If not a new document, move on
  }

  try {
    // Generate the orderNumber based on your logic (e.g., current timestamp)
    const currentTimestamp = Date.now().toString();
    this.orderNumber = `ORD-${currentTimestamp}`;
    next();
  } catch (error) {
    next(error);
  }
});

export default model('Sales', salesSchema);
