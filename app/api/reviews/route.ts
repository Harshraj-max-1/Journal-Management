import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  
  if (!session || user.role !== 'PUBLISHER') {
    return NextResponse.json({ message: "Unauthorized Publisher Access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { paperId, comments, rating, decision } = body;

    if (!paperId || !comments) {
      return NextResponse.json({ message: "Manuscript ID and critique are required" }, { status: 400 });
    }

    // 1. Create the Review
    const review = await prisma.review.create({
      data: {
        paperId,
        comments,
        rating: parseInt(rating),
        decision,
        publisherId: user.id
      }
    });

    // 2. Update Paper Status based on decision
    let newStatus: any = "UNDER_REVIEW";
    if (decision === "RECOMMEND_ACCEPT") {
      newStatus = "PUBLISHED";
    } else if (decision === "RECOMMEND_REJECT") {
      newStatus = "REJECTED";
    } else if (decision === "REQUEST_REVISIONS") {
      newStatus = "SUBMITTED";
    }

    await prisma.paper.update({
      where: { id: paperId },
      data: { status: newStatus }
    });


    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
