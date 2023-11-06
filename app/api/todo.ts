import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { comment } = req.body;

  try {
    console.log(`${comment}`);
    await prisma.todo.create({
      data: {
        comment: comment,
      },
    });
    res.status(200).json({ message: "Note Created" });
    console.log("no server error");
  } catch (err) {
    console.log("error server");
    res.status(408).json({ message: "Request Timeout" });
    console.error(err);
  }
}
