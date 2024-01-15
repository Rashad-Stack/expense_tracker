import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import statusCodes from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Category is required!").max(255),
});

export async function POST(request: NextRequest) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: statusCodes.UNAUTHORIZED,
      },
    );
  }

  const body = await request.json();
  const validation = categorySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: statusCodes.BAD_REQUEST,
    });
  }

  const newCategory = await prisma.category.create({
    data: {
      name: validation.data.name,
      userId,
    },
  });

  return NextResponse.json(newCategory, {
    status: statusCodes.CREATED,
  });
}
