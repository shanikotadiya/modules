import { responceFormatter } from "@/app/lib/responceFormatter";
import { NextResponse } from "next/server";
import User from "@/app/models/registeruser";
import { registreValidator } from "@/app/lib/validators";
import { hashPassword } from "@/app/lib/authUtils";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const { error } = registreValidator({ username, email, password });

    if (error) {
      return NextResponse.json(
        responceFormatter({
          status: "error",
          message: error.details[0].message,
        }),
        { status: 400 }
      );
    }
      const connectDb = (await import("@/app/lib/db")).default;
    await connectDb();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        responceFormatter({
          status: "error",
          message: "User with this email already exists.",
        }),
        { status: 400 }
      );
    }

    const encryptPassword = await hashPassword(password);
    // Create a new instance of the User model
    await new User({
      username,
      email,
      encryptPassword, // Use the 'encryptPassword' field as per your schema
    }).save();

    return NextResponse.json(
      responceFormatter({
        status: "success",
        message: "data insert successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      responceFormatter({
        status: "error",
        message: "failed to insert data. Please try again later",
      }),
      { status: 500 }
    );
  }
}
