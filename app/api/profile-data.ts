import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {} = req.body;
  //need to check back the author then return and save the post
  try {
    res.status(200).json({ message: "Note Created" });
    console.log("no server error");
  } catch (err) {
    console.log("error server");
    res.status(408).json({ message: "Request Timeout" });
    console.error(err);
  }
}
