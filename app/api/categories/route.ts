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

  try {
    if (!userId) {
      return NextResponse.json(
        { name: "custom", message: "Unauthorized" },
        {
          status: statusCodes.UNAUTHORIZED,
        },
      );
    }

    const body = await request.json();
    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error, {
        status: statusCodes.BAD_REQUEST,
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        ...validation.data,
        userId,
      },
    });

    return NextResponse.json(newCategory, {
      status: statusCodes.CREATED,
    });
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  try {
    const allCategoryByUser = await prisma.category.findMany({
      where: { userId },
    });

    return NextResponse.json(allCategoryByUser, {
      status: statusCodes.OK,
    });
  } catch (error) {
    console.log("🚀 ~ Get ~ error:", error);

    throw error;
  }
}
