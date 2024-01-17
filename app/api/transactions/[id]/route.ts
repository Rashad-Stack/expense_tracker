import prisma from "@/prisma/db";
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
        { name: "custom", message: "Invalid transaction id!" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const transaction = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { name: "custom", message: "Invalid transaction id!" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    return Response.json(transaction, {
      status: StatusCodes.OK,
    });
  } catch (error) {
    throw error;
  }
}
