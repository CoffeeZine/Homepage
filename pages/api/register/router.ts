// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    // if (await User.findOne({ email })) throw new Error("User already exists");
    // await connectMongoDB();
    // await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
