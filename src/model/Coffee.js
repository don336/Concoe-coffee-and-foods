const coffeeSchema = new mongoose.connect({
  variety: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  yeild: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Coffee", coffeeSchema);
