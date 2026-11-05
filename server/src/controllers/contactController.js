import ContactMessage from "../models/ContactMessage.js";

export async function createContactMessage(req, res) {
  if (req.body.website) {
    return res.status(201).json({ message: "Message saved" });
  }

  await ContactMessage.create({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  return res.status(201).json({ message: "Message saved" });
}
