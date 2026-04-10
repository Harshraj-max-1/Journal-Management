import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const validRole = role && ['AUTHOR', 'PUBLISHER', 'EDITOR', 'ADMIN', 'READER'].includes(role.toUpperCase()) 
                        ? role.toUpperCase() : 'READER';

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: validRole
      }
    });

    return NextResponse.json({ message: "User created successfully", user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
