import { NextResponse } from "next/server";
import { loginValidator } from "@/app/lib/validators";
import { responceFormatter } from "@/app/lib/responceFormatter";
import User from "@/app/models/registeruser";
import { comparePassword } from "@/app/lib/authUtils";
import connectDb from "@/app/lib/db";
import { genertaeToken } from "@/app/lib/jwtUtils";
import Login from "@/app/login/page";
export async function POST(req) {
  const { email, password } = await req.json();

  const { error } = loginValidator({ email, password });
  if (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.details[0].message,
      },
      {
        status: 400,
      }
    );
  }
  await connectDb();
  const user = await User.findOne({ email });
  // console.log(user);

  if (!user) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid Username Password",
      },
      { status: 400 }
    );
  }
  const auth = await comparePassword(password, user.encryptPassword);

  if (!auth) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid username password",
      },
      { status: 400 }
    );
  }

  const jwtsign = genertaeToken(user);
  return NextResponse.json(
    {
      status: "success",
      message: "Login Successfull",
      jwtsign,
    },
    { status: 200 }
  );
}
