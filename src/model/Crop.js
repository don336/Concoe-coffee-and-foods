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
  acreage: {
    type: String,
    required: true,
  },
  expectedYields: {
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
