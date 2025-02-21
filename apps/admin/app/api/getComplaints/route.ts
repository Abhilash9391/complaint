import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";
const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const segment = searchParams.get("segment"); 

  if (!segment) {
    return NextResponse.json({ error: "Segment is required" }, { status: 400 });
  }

  try {
    const complaints = await prisma.complaints.findMany({
      where: { segment },
      include: {
        solution: {
          include: {
            staff: true, 
          },
        },
      },
      
    });

    return NextResponse.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
