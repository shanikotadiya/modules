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
        pass: "hiwv jglj wbtv uhxe", // App Password (if 2FA enabled)
      },
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
      },
    });

    const mailOptions = {
      from: "shanikotadiya@gmail.com",
      to,
      subject:
        "Experienced MERN & Next.js Developer | 1.5+ Years in Scalable Web Solutions",
      html: `
       <p>Dear Hiring Manager,</p>

<p>
  I hope you're doing well. I am writing to express my interest in the MERN Stack Developer position. 
  With 1.5 years of experience at Tech Transformer, I have worked extensively on MERN stack development, 
  including Next.js for building dynamic and scalable applications.
</p>

<p>
  My expertise includes MERN Stack (MongoDB, Express.js, React.js, Node.js), 
  Next.js for server-side rendering and dynamic web applications, JWT authentication and API development, 
  database management and optimization, and full-stack development.
</p>

<p>
  Throughout my career, I have worked on several impactful projects. I developed a User Management System, 
  implementing JWT authentication and validation to enhance security. I also built Journey Junction, 
  a travel guide platform that estimates cost, time, and distance for different travel modes.
</p>

<p>
  Another key project I contributed to is IAM4JobPortal, a job portal designed to streamline the recruitment 
  process. Additionally, I worked on Veg Company (Next.js), an e-commerce platform for fresh produce, 
  and Veg Admin (Next.js), a dynamic admin dashboard that allows seamless website content management.
</p>

<p>
  Most recently, I developed MediNest, a healthcare management system that simplifies patient record handling, 
  doctor appointments, and medical services, improving efficiency in the healthcare domain.
</p>

<p>
  I am excited about the opportunity to contribute my skills to your team and help build scalable web solutions. 
  Please let me know a convenient time to discuss how I can add value to your organization.
</p>

<p>Looking forward to your response.</p>

<p>Best regards,</p>

<p>
  Shani Kotadiya<br />
  shanikotadiya@gmail.com | 9409176918
</p>
        `,
      attachments: [
        {
          filename: "shanikotadiya_mernstack_hr_1yoe.pdf", // Set the filename
          path: path.join(
            process.cwd(),
            "public",
            "Shani_Kotadiya_MERN_Stack_Developer_1Y_Experience.pdf"
          ),
          contentType: "application/pdf",
        },
      ],
    };

    const exestingemail = await companysmail.findOne({ email: to });
    if (!exestingemail) {
      await transporter.sendMail(mailOptions);

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
  return NextResponse.json({ data: result });
}

export async function DELETE(req) {
  const { query } = Object.fromEntries(new URL(req.url).searchParams);
}
