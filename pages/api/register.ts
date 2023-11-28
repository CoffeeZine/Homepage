import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;
  //update
  //friday coding
  //sunday coding
  //monday coding
  //tuseday coding
  try {
    console.log(`${email} and ${password}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Note Created" });
    console.log("no server error");
    alert("user created!");
  } catch (err) {
    console.log("error server");
    res.status(408).json({ message: "Request Timeout" });
    console.error(err);
  }
}
