import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todoId = req.query.id;
  if (req.method === "DELETE") {
    const todo = await prisma.todo.delete({
      where: { id: String(todoId) },
    });
  } else {
    console.log("todo could not be created");
  }
}
