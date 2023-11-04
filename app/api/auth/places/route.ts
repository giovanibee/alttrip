import { NextRequest, NextResponse } from "next/server"

export default function handler(req: NextRequest, res: NextResponse) {
  switch (req.method) {
    case "GET":
      return res.json()
    case "POST":
      return res.json()
    case "PUT":
      return res.json()
    case "DELETE":
      return res.json()
    default:
      return res.json()
  }
}
