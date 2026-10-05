import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "babajyad2026@gmail.com",
      subject: "رسالة جديدة من موقع باب أجياد",
      html: `
        <h2>رسالة جديدة من الموقع</h2>

        <p><strong>الاسم:</strong> ${name}</p>
        <p><strong>الهاتف:</strong> ${phone}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>

        <hr />

        <p><strong>الرسالة:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};