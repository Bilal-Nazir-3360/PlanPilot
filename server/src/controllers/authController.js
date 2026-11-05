import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { clearAuthCookie, setAuthCookie } from "../utils/token.js";

const DUMMY_PASSWORD_HASH =
  "$2b$12$GfX5JDTuvm4fPlYqaJV7fOCH/t7PW3PRoRMrZ.5H9FnAvGkkPgU2e";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "An account with this email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  setAuthCookie(res, user._id);

  return res.status(201).json({ user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+passwordHash");
  const passwordHash = user?.passwordHash || DUMMY_PASSWORD_HASH;
  const passwordMatches = await bcrypt.compare(password, passwordHash);

  if (!user || !passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  setAuthCookie(res, user._id);
  return res.json({ user });
}

export function logout(_req, res) {
  clearAuthCookie(res);
  return res.json({ message: "Signed out" });
}

export function me(req, res) {
  return res.json({ user: req.user });
}
