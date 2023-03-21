const feedbackSchema = new mongoose.connect({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

export default mongoose.model("FeedBack", feedbackSchema);
