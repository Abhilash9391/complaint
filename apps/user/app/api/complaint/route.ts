import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

export async function POST(req: Request) {
    const prisma = new PrismaClient()
  try {
    const data = await req.json(); 
   await  prisma.complaints.create({
      data : {
        userId : 1,
        complaint : data.complaint,
        segment : data.segment

      }
    })
    return NextResponse.json({ message: "complaint raised successfully", data });
    
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
