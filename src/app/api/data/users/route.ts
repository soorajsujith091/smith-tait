import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const usersPath = path.join(process.cwd(), "src", "data", "users.json");
    if (!fs.existsSync(usersPath)) {
      return NextResponse.json({ success: true, data: [] });
    }
    const data = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const usersPath = path.join(process.cwd(), "src", "data", "users.json");
    fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
