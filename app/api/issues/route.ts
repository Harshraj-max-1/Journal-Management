import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const issues = await prisma.journalIssue.findMany({
      orderBy: [{ volume: 'desc' }, { issue: 'desc' }]
    });
    return NextResponse.json(issues);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || user.role !== 'EDITOR' && user.role !== 'ADMIN') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, volume, issue, description } = body;

    const newIssue = await prisma.journalIssue.create({
      data: {
        title,
        volume: parseInt(volume),
        issue: parseInt(issue),
        description,
        publishedAt: new Date()
      }
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
