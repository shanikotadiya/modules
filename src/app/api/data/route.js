import { NextResponse } from "next/server";
import {
  getRecords,
  updateRecord,
  deleteRecord,
} from "@/app/services/recordservice";
import { responceFormatter } from "@/app/lib/responceFormatter";

export async function GET(req) {
  const connectDb = (await import("@/app/lib/db")).default;
  await connectDb();
  if (req.method == "GET") {
    const {
      query = "",
      page = 1,
      limit = 10,
    } = Object.fromEntries(new URL(req.url).searchParams);
    try {
      const { users, totalPages, totalcount } = await getRecords(
        query,
        page,
        limit
      );

      return NextResponse.json(
        responceFormatter({
          status: "Success",
          message: "data Fetch Successfully",
          data: { users, totalPages, totalcount },
        }),
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        responceFormatter({
          status: "error",
          message: "failed to fetch data. Please try again later",
        }),
        { status: 500 }
      );
    }
  }
}

export async function DELETE(req) {
  if (req.method == "DELETE") {
    const { query } = Object.fromEntries(new URL(req.url).searchParams);
    try {
      const result = await deleteRecord(query);
      return NextResponse.json(
        responceFormatter({
          status: "success",
          message: "Delete Record Successfull",
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        responceFormatter({
          status: "error",
          message: "failed to delete data. Please try again later",
        }),
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(req) {
  const { _id, username, email } = await req.json();

  if (req.method == "PUT") {
    try {
      const result = await updateRecord(_id, username, email);

      return NextResponse.json(
        responceFormatter({
          status: 'success',
          message: "Record Edit Successfully",
        }),
        {
          status: result.code,
        }
      );
    } catch (error) {
      return NextResponse.json(
        responceFormatter({
          status: "error",
          message: "failed to Edit data. Please try again later",
        }),
        {
          status: 500,
        }
      );
    }
  }
}
