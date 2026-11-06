import nodemailer from "nodemailer";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const sendContactEmail = async (formData) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, EMAIL_USER, EMAIL_PASS } = process.env;
  const missingSettings = [
    ["SMTP_HOST", SMTP_HOST],
    ["EMAIL_USER", EMAIL_USER],
    ["EMAIL_PASS", EMAIL_PASS],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingSettings.length) {
    throw new Error(`Missing SMTP configuration: ${missingSettings.join(", ")}`);
  }

  const port = Number(SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });

  const { name, email, phone, subject, message } = formData;
  const safeSubject = (subject || "No subject").replace(/[\r\n]+/g, " ").trim();
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "sales@cputek.in";

  await transporter.sendMail({
    from: `"CPUTEK Website" <${EMAIL_USER}>`,
    to: recipient,
    replyTo: email,
    subject: `New contact form submission - ${safeSubject}`,
    text: [
      "New Contact Form Submission",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Subject: ${subject || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "Not provided")}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\r?\n/g, "<br>")}</p>
    `,
  });
};
