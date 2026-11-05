import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
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
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
  },
  { timestamps: true },
);

teamMemberSchema.index(
  { owner: 1, email: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

teamMemberSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.owner;
    return ret;
  },
});

export default mongoose.model("TeamMember", teamMemberSchema);
