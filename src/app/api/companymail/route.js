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
        user: "janakdobariya31@gmail.com", // Your email
        pass: "dfsm abjs urod lwdy", // App Password (if 2FA enabled)
      },
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
      },
    });

    const mailOptions = {
      from: "janakdobariya31@gmail.com",
      to,
      Subject: 
        "Python Developer | Seeking Internship Opportunity",
      html: `
      <p>Dear Hiring Manager,</p>
      
      <p>
        I hope you're doing well.
      </p>
      
      <p>
        My name is Janak Dobariya, a Python developer currently pursuing a B.E. in Computer Engineering (AI & ML).
        I'm actively seeking a Python development internship where I can apply my skills and continue learning in a real-world environment.
      </p>
      
      <p>
        During my recent internship at Oceanmtech, I worked on projects involving web scraping, data automation,
        and Python scripting, which gave me practical experience and strengthened my problem-solving abilities.
      </p>
      
      <p>
        I’ve attached my resume for your review, and I’d appreciate the opportunity to discuss how I might contribute to your team.
      </p>
      
      <p>Thank you for your time and consideration.</p>
      
      <p>Best regards,</p>
      
      <p>
        Janak Dobariya<br />
        janakdobariya31@gmail.com<br />
        +91 9106907071
      </p>
        `,
      attachments: [
        {
          filename: "JANAK Dobariya's Resume.pdf", // Set the filename
          path: path.join(
            process.cwd(),
            "public",
            "JANAK Dobariya's Resume.pdf"
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
