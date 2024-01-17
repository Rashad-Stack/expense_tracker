import prisma from "@/prisma/db";
import { transactionSchema } from "@/types/validator";
import { auth } from "@clerk/nextjs";
import statusCodes from "http-status-codes";
import { revalidatePath } from "next/cache";
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

    revalidatePath("/dashboard");
    return NextResponse.json(newTransaction, {
      status: statusCodes.CREATED,
    });
  } catch (error) {}
}
