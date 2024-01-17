import prisma from "@/prisma/db";
import { transactionPatchSchema } from "@/types/validator";
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

export async function PATCH(
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

    const body = await request.json();
    const validation = transactionPatchSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const data = {
      ...validation.data,
      userId,
      amount:
        validation.data.spendType === "INCOME"
          ? Math.abs(Number(validation.data.amount))
          : Math.abs(Number(validation.data.amount)) * -1,
    };

    const transaction = await prisma.transaction.update({
      where: {
        userId,
        id,
      },
      data,
    });

    return Response.json(transaction, {
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    throw error;
  }
}
