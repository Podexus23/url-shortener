import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema(
  {
    url: String,
    shortCode: { type: String, require: true, unique: true, index: true },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model('Url', urlSchema);

export default UrlModel;
