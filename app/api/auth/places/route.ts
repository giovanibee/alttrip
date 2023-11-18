'use server'

import { NextRequest, NextResponse } from "next/server"

export default function handler(req: NextRequest, res: NextResponse) {
  switch (req.method) {
    case "GET":
      return NextResponse.json(
        [{
          id: 1,
          name: 'Area 51',
          summary: 'A secret military base in the Nevada desert',
          details: 'Look for a juniper tree',
          secretCode: '1234',
          coords: [36.27555765016105, -115.16988130693387]
        }], { status: 200 }
      )
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
