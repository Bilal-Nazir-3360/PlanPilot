import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ContactMessage", contactMessageSchema);
