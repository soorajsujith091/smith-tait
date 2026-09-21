import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const leadsPath = path.join(process.cwd(), "src", "data", "leads.json");
    if (!fs.existsSync(leadsPath)) {
      return NextResponse.json({ success: true, data: [] });
    }
    const data = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const leadsPath = path.join(process.cwd(), "src", "data", "leads.json");
    if (!fs.existsSync(leadsPath)) {
      return NextResponse.json({ success: false, error: "Data not found" }, { status: 404 });
    }
    const data = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    const updatedData = data.filter((lead: any) => lead.id !== id);
    fs.writeFileSync(leadsPath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
