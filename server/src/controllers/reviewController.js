import mongoose from "mongoose";
import Review from "../models/Review.js";

export async function listReviews(_req, res) {
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(200);
  return res.json({ reviews });
}

export async function createReview(req, res) {
  if (req.body.website) {
    return res.status(201).json({ message: "Review saved" });
  }

  const review = await Review.create({
    name: req.body.name,
    role: req.body.role,
    rating: req.body.rating,
    comment: req.body.comment,
    author: req.user?._id || null,
    isSample: false,
  });
  return res.status(201).json({ review });
}

export async function updateReview(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Review not found" });
  }

  const { website: _website, ...changes } = req.body;
  const review = await Review.findOneAndUpdate(
    {
      _id: req.params.id,
      author: req.user.id,
      isSample: false,
    },
    { $set: changes },
    { new: true, runValidators: true },
  );
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  return res.json({ review });
}

export async function deleteReview(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Review not found" });
  }

  const review = await Review.findOneAndDelete({
    _id: req.params.id,
    author: req.user.id,
    isSample: false,
  });
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  return res.json({ message: "Review deleted" });
}
