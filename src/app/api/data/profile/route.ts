import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    // Check cookie
    const cookies = request.headers.get("cookie") || "";
    const emailMatch = cookies.match(/admin_email=([^;]+)/);
    const loggedInEmail = emailMatch ? decodeURIComponent(emailMatch[1]) : null;

    const usersPath = path.join(process.cwd(), "src", "data", "users.json");
    if (loggedInEmail && fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
      const user = users.find((u: any) => u.email === loggedInEmail);
      if (user) {
        return NextResponse.json({ success: true, data: { name: user.name, role: user.role, image: user.image } });
      }
    }

    // Fallback to superadmin profile
    const profilePath = path.join(process.cwd(), "src", "data", "profile.json");
    if (!fs.existsSync(profilePath)) {
      return NextResponse.json({ success: true, data: { name: "Admin User", role: "Lead Architect", image: "/images/general/Nour2.webp" } });
    }
    const data = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Check cookie
    const cookies = request.headers.get("cookie") || "";
    const emailMatch = cookies.match(/admin_email=([^;]+)/);
    const loggedInEmail = emailMatch ? decodeURIComponent(emailMatch[1]) : null;

    const usersPath = path.join(process.cwd(), "src", "data", "users.json");
    if (loggedInEmail && fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
      const userIndex = users.findIndex((u: any) => u.email === loggedInEmail);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name: data.name, role: data.role, image: data.image };
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        return NextResponse.json({ success: true });
      }
    }

    // Fallback to superadmin profile
    const profilePath = path.join(process.cwd(), "src", "data", "profile.json");
    fs.writeFileSync(profilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
