import prisma from "@/prisma/db";
import { transactionSchema } from "@/types/validator";
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
    const validation = transactionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error, {
        status: statusCodes.BAD_REQUEST,
      });
    }

    const totalBalance = await prisma.transaction.aggregate({
      where: {
        userId,
        categoryId: validation.data.categoryId,
      },
      _sum: {
        amount: true,
      },
    });

    const balance = totalBalance._sum.amount || 0;

    if (
      validation.data.spendType === "EXPENSE" &&
      balance <= Math.abs(Number(validation.data.amount))
    ) {
      return NextResponse.json(
        {
          name: "custom",
          message: "You can't deposit more than your balance",
        },
        {
          status: statusCodes.BAD_REQUEST,
        },
      );
    }

    const data = {
      ...validation.data,
      userId,
      amount:
        validation.data.spendType === "INCOME"
          ? Math.abs(Number(validation.data.amount))
          : Math.abs(Number(validation.data.amount)) * -1,
    };

    const newTransaction = await prisma.transaction.create({
      data,
    });

    return NextResponse.json(newTransaction, {
      status: statusCodes.CREATED,
    });
  } catch (error) {
    throw error;
  }
}
