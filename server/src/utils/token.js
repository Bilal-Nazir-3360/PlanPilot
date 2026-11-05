import jwt from "jsonwebtoken";

const COOKIE_NAME = "pp_token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function cookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    // Cross-domain Vercel-to-Render cookies need secure and SameSite=None in production.
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };
}

export function setAuthCookie(res, userId) {
  const token = jwt.sign(
    { sub: userId.toString() },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  res.cookie(COOKIE_NAME, token, cookieOptions());
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, cookieOptions());
}

export { COOKIE_NAME };
