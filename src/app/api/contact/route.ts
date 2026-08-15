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

    // Log the submission (replace with email service / CMS integration later)
    console.log("=== New Contact Enquiry ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", data.phone || "Not provided");
    console.log("Company:", data.company || "Not provided");
    console.log("Project Type:", projectType);
    console.log("Message:", message);
    console.log("Timestamp:", new Date().toISOString());
    console.log("==========================");

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
