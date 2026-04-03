import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET Paper Details with Reviews and Author
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || (user.role !== 'EDITOR' && user.role !== 'ADMIN' && user.role !== 'REVIEWER' && user.role !== 'AUTHOR')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const paper = await prisma.paper.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, email: true } },
        reviews: {
          include: {
            reviewer: { select: { name: true } }
          }
        }
      }
    });

    if (!paper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(paper);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// UPDATE Paper (Status, Title, or Abstract)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  
  if (!session || (user.role !== 'EDITOR' && user.role !== 'ADMIN' && user.role !== 'AUTHOR')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { status, title, abstract } = body;

    const paper = await prisma.paper.update({
      where: { id },
      data: { 
        ...(status && { status }),
        ...(title && { title }),
        ...(abstract && { abstract })
      }
    });

    return NextResponse.json(paper);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
