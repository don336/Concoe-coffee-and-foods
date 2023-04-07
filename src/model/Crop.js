import mongoose from "mongoose";

const cropSchema = mongoose.Schema({
  cropType: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  season: {
    type: String,
    required: true,
  },
  Acreage: {
    type: String,
    required: true,
  },
  expectedYield: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model("Crop", cropSchema);
