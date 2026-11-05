import mongoose from "mongoose";

const TASK_STATUSES = ["Todo", "In progress", "Done"];

const taskSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: TASK_STATUSES[0],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    due: {
      type: String,
      match: /^(|\d{4}-\d{2}-\d{2})$/,
    },
    project: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    tag: {
      type: String,
      trim: true,
      maxlength: 40,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

taskSchema.index({ owner: 1, status: 1, order: 1 });

taskSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.owner;
    return ret;
  },
});

export default mongoose.model("Task", taskSchema);
