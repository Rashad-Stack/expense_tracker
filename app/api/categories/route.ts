import prisma from "@/prisma/db";
import { categorySchema } from "@/types/validator";
import { auth } from "@clerk/nextjs";
import statusCodes from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

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
  try {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    if (!userId) {
      return NextResponse.json(
        { name: "custom", message: "Unauthorized" },
        {
          status: statusCodes.UNAUTHORIZED,
        },
      );
    }

    const allCategoryByUser = await prisma.category.findMany({
      where: { userId },
    });

    return NextResponse.json(allCategoryByUser, {
      status: statusCodes.OK,
    });
  } catch (error) {
    throw error;
  }
}
