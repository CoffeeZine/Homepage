/* eslint-disable react-hooks/rules-of-hooks */
import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;

  try {
    alert("processing");
    console.log(`${title} and ${content}`);

    await prisma.note.create({
      data: {
        title: title,
        content: content,
      },
    });
    alert("done");
    res.status(200).json({ message: "Note Created" });
    console.log("no server error");
  } catch (err) {
    console.log("error server");
    res.status(408).json({ message: "Request Timeout" });
    console.error(err);
  }
}
