import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    console.log(`${email} and ${password}`);
    await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    res.status(200).json({ message: "Note Created" });
    console.log("no server error");
    alert("user created!");
  } catch (err) {
    console.log("error server");
    res.status(408).json({ message: "Request Timeout" });
    console.error(err);
  }
}
