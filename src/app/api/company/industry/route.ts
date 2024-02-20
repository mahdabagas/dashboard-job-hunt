import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  const indutries = await prisma.industry.findMany();

  return NextResponse.json(indutries);
}
