import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 60,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    color: {
      type: String,
      trim: true,
      match: /^(#[0-9a-fA-F]{3,8}|[a-zA-Z0-9_-]{1,20})$/,
    },
  },
  { timestamps: true },
);

projectSchema.index(
  { owner: 1, name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

projectSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.owner;
    return ret;
  },
});

export default mongoose.model("Project", projectSchema);
