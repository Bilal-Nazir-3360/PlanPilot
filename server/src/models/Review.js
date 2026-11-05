import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    role: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: Number.isInteger,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    isSample: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

reviewSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    ret.ownerId = ret.author ? ret.author.toString() : null;
    delete ret._id;
    delete ret.author;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Review", reviewSchema);
