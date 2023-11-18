'use server'

import { NextRequest, NextResponse } from "next/server"

export async function GET(_req: NextRequest, _res: NextResponse) {
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
}

export async function POST(req: NextRequest, _res: NextResponse) {
  return NextResponse.json({})
}

export async function PUT(req: NextRequest, _res: NextResponse) {
  return NextResponse.json({})
}

export async function DELETE(req: NextRequest, _res: NextResponse) {
  return NextResponse.json({})
}
