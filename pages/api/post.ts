import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
type Nullable<T> = T | null;
interface Author {
  id: string;
  email: string;
  password: string;
  name?: string;
  address?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, slug, body, author } = req.body;

  try {
    console.log(`${title} and ${slug}`);
    const response = await prisma.user.findFirst({
      where: {
        email: {
          equals: "!12@12",
        },
      },
    });
    console.log(response);
    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        body: body,
        author: author,
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
