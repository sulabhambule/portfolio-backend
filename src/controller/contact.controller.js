import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ContactMessage } from "../models/ContactMessage.model.js";
import { sendMail } from "../utils/sendMail.js";

export const createContactMessage = AsyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  const contact = await ContactMessage.create({
    name,
    email,
    subject,
    message,
  });

  await sendMail({
    subject: `📩 New Contact Message: ${subject}`,
    html: `
      <h2>New contact message on your portfolio:</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, contact, "Contact message submitted successfully")
    );
});

export const getAllContactMessages = AsyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, messages));
});
