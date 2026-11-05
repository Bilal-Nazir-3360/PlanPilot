import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/token.js";

export async function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "Not signed in" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    if (
      typeof payload !== "object" ||
      !payload.sub ||
      !mongoose.isValidObjectId(payload.sub)
    ) {
      return res.status(401).json({ message: "Not signed in" });
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "Not signed in" });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Not signed in" });
    }
    return next(error);
  }
}
