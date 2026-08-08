import nodemailer from "nodemailer";

export const sendContactEmail = async (formData) => {
  console.log("EMAIL USER:", process.env.EMAIL_USER);
  console.log("SMTP HOST:", process.env.SMTP_HOST);
  console.log("SMTP PORT:", process.env.SMTP_PORT);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT) || 587,
  
    secure: false,
  
    family: 4,
  
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP CONNECTION SUCCESSFUL");
  } catch (error) {
    console.error("❌ SMTP CONNECTION FAILED:", error);
    throw error;
  }

  const { name, email, phone, subject, message } = formData;

  await transporter.sendMail({
    from: `"CPUTEK Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,

    subject: `New Contact Form Submission - ${
      subject || "No Subject"
    }`,

    html: `
      <h2>New Contact Form Submission</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>

      <p><strong>Subject:</strong> ${
        subject || "Not Provided"
      }</p>

      <hr />

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    `,
  });
};