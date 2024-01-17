import prisma from "@/prisma/db";
import { categorySchema } from "@/types/validator";
import { auth } from "@clerk/nextjs";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const id = params.id;

    if (!userId) {
      return NextResponse.json(
        {
          name: "custom",
          message: "Please login first!",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    if (!id) {
      return NextResponse.json(
        { name: "custom", message: "Invalid category id!" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const categoryToDelete = prisma.category.delete({
      where: {
        id,
      },
    });

    const transactions = prisma.transaction.deleteMany({
      where: {
        categoryId: id,
      },
    });

    const [category] = await Promise.all([categoryToDelete, transactions]);

    if (!category) {
      return NextResponse.json(
        { name: "custom", message: "Invalid category id!" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    return Response.json(category, {
      status: StatusCodes.OK,
    });
  } catch (error) {
    throw error;
  }
}

export async function PATCH(
  request: NextResponse,
  { params }: { params: { id: string } },
) {
  try {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const id = params.id;

    if (!userId) {
      return NextResponse.json(
        {
          name: "custom",
          message: "Please login first!",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    if (!id) {
      return NextResponse.json(
        { name: "custom", message: "Invalid category id!" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const body = await request.json();
    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const category = await prisma.category.update({
      where: {
        id,
      },

      data: {
        name: validation.data.name,
      },
    });

    if (!category) {
      return NextResponse.json(
        { name: "custom", message: "Invalid category id!" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    return Response.json(category, {
      status: StatusCodes.OK,
    });
  } catch (error) {
    throw error;
  }
}
