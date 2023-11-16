import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    console.log(`${email} and ${password}`);
    const response = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
    const hashPassword = await bcrypt.compare(
      password,
      response?.password || "123456"
    );
    // console.log(response, "hashPassword", hashPassword);
    console.log("no server error");
    res.status(200).json({ message: "logined" });
  } catch (err) {
    console.log("error server");
    res.status(408).json({ message: "Request Timeout" });
    console.error(err);
  }
}
