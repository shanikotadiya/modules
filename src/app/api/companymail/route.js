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
      
          <p>I hope you're doing well. I am writing to express my interest in the <strong>MERN Stack Developer</strong> position. With <strong>1.5 years of experience</strong> at <strong>Tech Transformer</strong>, I have worked extensively on <strong>MERN stack development</strong>, including <strong>Next.js</strong> for building dynamic and scalable applications.</p>
      
          <h3>Key Skills & Experience:</h3>
          <ul>
            <li><strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js)</li>
            <li><strong>Next.js</strong> for SSR & Dynamic Web Applications</li>
            <li><strong>JWT Authentication & API Development</strong></li>
            <li><strong>Database Management & Optimization</strong></li>
            <li><strong>Frontend & Backend Development</strong></li>
          </ul>
      
          <h3>Notable Projects:</h3>
          <ul>
            <li><strong>User Management System</strong> – Implemented <strong>JWT authentication & validation</strong> for secure access control.</li>
            <li><strong>Journey Junction</strong> – Developed a travel guide platform estimating cost, time, and distance.</li>
            <li><strong>IAM4JobPortal</strong> – Built a job portal application to streamline recruitment.</li>
            <li><strong>Veg Company (Next.js)</strong> – Designed an e-commerce platform for fresh produce.</li>
            <li><strong>Veg Admin (Next.js)</strong> – Created a dynamic admin dashboard for managing website content efficiently.</li>
          </ul>
      
          <p>I am excited about the opportunity to contribute my skills to your team and help build scalable web solutions. Please let me know a convenient time to discuss how I can add value to your organization.</p>
      
          <p>Looking forward to your response.</p>
      
          <p>Best regards,</p>
          <p><strong>Shani Kotadiya</strong><br>
           shanikotadiya@gmail.com |  9409176918 </p>
        `,
      attachments: [
        {
          filename: "shanikotadiya_mernstack_hr_1yoe.pdf", // Set the filename
          path: path.join(
            process.cwd(),
            "public",
            "shanikotadiya_mernstack_hr_1yoe.pdf"
          ), 
          contentType: "application/pdf",
        },
      ],
    };

    const exestingemail = await companysmail.findOne({ email: to });
    if (
      exestingemail &&
      new Date(exestingemail.date) >= new Date(Date.now() - 4 * 86400000)
    ) {
      return NextResponse.json({
        success:false,
        message: "Email was sent within the last 4 days.",
      },{status:409});
    }

    await transporter.sendMail(mailOptions);
    await companysmail.create({ email: to });


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
