import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/token.js";

async function getAuthenticatedUser(req) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    if (
      typeof payload !== "object" ||
      !payload.sub ||
      !mongoose.isValidObjectId(payload.sub)
    ) {
      return null;
    }

    const user = await User.findById(payload.sub);
    return user || null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return null;
    }
    throw error;
  }
}

export async function optionalAuth(req, _res, next) {
  try {
    req.user = await getAuthenticatedUser(req);
    return next();
  } catch (error) {
    return next(error);
  }
}

export async function requireAuth(req, res, next) {
  try {
    req.user = await getAuthenticatedUser(req);
    if (!req.user) {
      return res.status(401).json({ message: "Not signed in" });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
