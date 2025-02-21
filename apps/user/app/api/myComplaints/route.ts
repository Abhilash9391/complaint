import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";
const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email"); 

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
        where  : {email},
        include : {
          complaints : {
            include : {
              solution : true
            }
          }
        }
    })

    return NextResponse.json(user!.complaints);
  } catch (error) {
    console.error("Error fetching users  complaints:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
