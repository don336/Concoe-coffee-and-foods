import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const cropSchema = Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  cropType: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

export default model('Crop', cropSchema);
