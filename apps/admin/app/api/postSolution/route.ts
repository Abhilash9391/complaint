import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    
    const body = await request.json();

    
    const solution = await prisma.solution.create({
      data: {
        staffId: body.staffId,
        solution: body.solution,
        complaintId: body.complaintId,
      },
    });

    
    await prisma.complaints.update({
      where: { id: body.complaintId },
      data: { status: "resolved" },
    });
    
    return NextResponse.json({ success: true, solution }, { status: 201 });

  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
