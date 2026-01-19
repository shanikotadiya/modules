import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import companysmail from "@/app/models/companysmail";
import { emailRecords } from "@/app/services/companymailservice";
import connectDb from "@/app/lib/db";
await connectDb();

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
  const { to } = await req.json(); // Get form data

  if (!to) {
    return NextResponse.json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shanikotadiya@gmail.com", // Your email
        pass: "bdkn btmf ahrr weeu", // App Password (if 2FA enabled)
      },
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
      },
    });
    console.log("tooo",to)
    const mailOptions = {
      from: "shanikotadiya@gmail.com",
      to,
      subject: "Senior MERN Stack Developer | 3+ Years Production Experience",
      html: `
    <p>Dear Hiring Manager,</p>

    <p>
      I hope you are doing well.
    </p>

    <p>
      My name is <strong>Shani Kotadiya</strong>, a MERN Stack Developer with over
      <strong>3 years of hands-on experience</strong> building scalable,
      production-ready web applications using React.js, Next.js, Node.js,
      MongoDB, and MySQL.
    </p>

    <p>
      Currently, I am working as a Full Stack Developer at Tech Erudite, where I
      actively contribute to CRM systems, automation workflows, and backend
      services. I have strong experience with GoHighLevel (GHL) CRM integrations,
      secure payment gateway integrations, webhook handling, and scheduled
      background jobs using cron.
    </p>

    <p>
      I have also worked extensively on Next.js applications with server-side
      rendering (SSR) to improve application performance and SEO, along with
      developing GraphQL APIs, managing relational data using SQL and Sequelize,
      and building real-time features using Socket.io.
    </p>

    <p>
      I take ownership of features end-to-end and focus on clean architecture,
      maintainable code, and reliable production systems.
    </p>

    <p>
      I have attached my resume for your review and would welcome the opportunity
      to discuss how my experience and skills can contribute to your team.
    </p>

    <p>Thank you for your time and consideration.</p>

    <p>
      Best regards,<br />
      <strong>Shani Kotadiya</strong><br />
      shanikotadiyda@gmail.com<br />
      +91 9409176918<br />
      <a href="https://www.linkedin.com/in/shani-kotadiya-614422204/" target="_blank">
        LinkedIn Profile
      </a>
    </p>
  `,
      attachments: [
        {
          filename: "shani-kotadiya-mern-stack.pdf", // Set the filename
          path: path.join(
            process.cwd(),
            "public",
            "shani-kotadiya-mern-stack.pdf"
          ),
          contentType: "application/pdf",
        },
      ],
    };

    const exestingemail = await companysmail.findOne({ email: to });
    if (!exestingemail) {
      await transporter.sendMail(mailOptions);
      await companysmail.create({ email: to });
      return NextResponse.json({
        success: true,
        message: "Email sent successfully!",
      });
    }
    if (
      exestingemail &&
      new Date(exestingemail.date) >= new Date(Date.now() - 4 * 86400000)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email was sent within the last 4 days.",
        },
        { status: 409 }
      );
    }
    await transporter.sendMail(mailOptions);
    await companysmail.updateOne(
      { email: to },
      { $set: { date: Date.now() } } // ✅ Use $set to update the field
    );
    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(req) {
  const {
    query = "",
    page = 1,
    limit = 10,
  } = Object.fromEntries(new URL(req.url).searchParams);

  const result = await emailRecords(query, page, limit);
  console.log(result);

  return NextResponse.json({ data: result });
}

export async function DELETE(req) {
  const { query } = Object.fromEntries(new URL(req.url).searchParams);
}
