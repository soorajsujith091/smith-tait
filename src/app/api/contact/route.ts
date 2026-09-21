import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, projectType, message } = data;
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newLead = {
      id: new Date().getTime().toString(),
      name,
      email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      projectType,
      message,
      createdAt: new Date().toISOString()
    };

    try {
      const fs = require('fs');
      const path = require('path');
      const leadsPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
      const leadsData = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')) : [];
      leadsData.push(newLead);
      fs.writeFileSync(leadsPath, JSON.stringify(leadsData, null, 2));
    } catch (fsError) {
      console.error("Failed to save lead to JSON:", fsError);
    }

    return NextResponse.json(
      { success: true, message: "Enquiry received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
