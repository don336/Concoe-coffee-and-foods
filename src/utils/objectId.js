import mongoose from 'mongoose';
export const funcToId = (id) => {
  const toId = new mongoose.Types.ObjectId(id);

  return toId;
};
