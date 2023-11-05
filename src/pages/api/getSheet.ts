import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";
import { months } from "@/lib/constants";

const secret = process.env.SECRET;

type Data = {
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const month = req.query.month;
  if (month) {
    const token = await getToken({ req, secret });
    const accessToken = token?.accessToken;

    if (accessToken) {
      const sheets = google.sheets({
        version: "v4",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: `${month}!A1:AF100`,
      });

      res.status(200).json({ data: data.data });
    } else {
      res.status(400).json({ error: "Token not found" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
