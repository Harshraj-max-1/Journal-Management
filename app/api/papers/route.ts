import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const view = searchParams.get('view');
  const role = (session.user as any).role;
  let papers;

  try {
    if (role === 'AUTHOR') {
      papers = await prisma.paper.findMany({ 
        where: { authorId: (session.user as any).id },
        orderBy: { createdAt: 'desc' }
      });
    } else if (role === 'REVIEWER') {
      if (view === 'history') {
        // Return papers reviewed by this user
        papers = await prisma.paper.findMany({
          where: {
            reviews: {
              some: { reviewerId: (session.user as any).id }
            }
          },
          include: { author: { select: { name: true } } },
          orderBy: { createdAt: 'desc' }
        });
      } else {
        // Return papers currently under review
        papers = await prisma.paper.findMany({ 
          where: { status: 'UNDER_REVIEW' },
          include: { author: { select: { name: true } } },
          orderBy: { createdAt: 'desc' }
        });
      }
    } else if (role === 'READER') {
       papers = await prisma.paper.findMany({ 
        where: { status: 'PUBLISHED' },
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      papers = await prisma.paper.findMany({
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      });
    }
    return NextResponse.json(papers);

  } catch(e) {
    console.error("GET PAPERS ERROR:", e);
    return NextResponse.json({ message: "Server error", detail: (e as any).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  
  if (!session || user.role !== 'AUTHOR') {
     return NextResponse.json({ message: "Unauthorized Author Access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { originalTitle, originalAbstract, originalFileUrl } = body;

    const paper = await prisma.paper.create({
      data: {
        originalTitle,
        originalAbstract,
        originalFileUrl,
        // Sync with primary display fields initially
        title: originalTitle,
        abstract: originalAbstract,
        fileUrl: originalFileUrl,
        authorId: user.id,
        status: "SUBMITTED"
      }
    });

    return NextResponse.json(paper);
  } catch(e) {
    console.error("POST PAPER ERROR:", e);
    return NextResponse.json({ message: "Server error", detail: (e as any).message }, { status: 500 });
  }
}

