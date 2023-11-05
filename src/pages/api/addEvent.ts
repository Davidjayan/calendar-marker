import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { calendar_v3, google } from "googleapis";
import moment from "moment";
import { randomUUID } from "crypto";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = req.body;

  const token = await getToken({ req, secret });
  const accessToken = token?.accessToken;

  if ((data.start, data.summary)) {
    if (accessToken) {
      const calendar = google.calendar({
        version: "v3",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const event2: calendar_v3.Schema$Event = {
        summary: data.summary,
        start: {
          dateTime: moment(data?.start).format("YYYY-MM-DDTHH:mm:ssZ"),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: moment(data?.start)
            .add(30, "minute")
            .format("YYYY-MM-DDTHH:mm:ssZ"),
          timeZone: "Asia/Kolkata",
        },
        recurrence: ["RRULE:FREQ=YEARLY;"],
        attendees: [{ email: "danieljayandj@gmail.com" }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 1 },
            { method: "email", minutes: 1 },
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: randomUUID(),
          },
        },
      };

      const result = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event2,
      });

      // const data = await calendar.calendarList.insert("dd");

      res.status(200).json({ data: result });
    } else {
      res.status(400).json({ data: "Token not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
