const farmSchema = new mongoose.connect({
  location: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Farm", farmSchema);
