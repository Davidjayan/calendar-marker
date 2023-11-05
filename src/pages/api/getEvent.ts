import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

const secret = process.env.SECRET;

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req, secret });
  const accessToken = token?.accessToken;
  const param = req.query.summary;
  if (accessToken) {
    const calendar = google.calendar({
      version: "v3",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = (
      await calendar.events.list({ q: param as string, calendarId: "primary" })
    ).data;

    res.status(200).json(data as any);
  } else {
    res.status(400).json({ data: "Token not found" });
  }
}
