import nodemailer from "nodemailer";

export const sendContactEmail = async (formData) => {
  console.log("EMAIL USER IN SERVICE:", process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { name, email, phone, subject, message } = formData;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission - ${subject || "No Subject"}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
      <p><strong>Subject:</strong> ${subject || "Not Provided"}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};