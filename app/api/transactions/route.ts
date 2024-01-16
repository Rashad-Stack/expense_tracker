import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import statusCodes from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const transactionSchema = z.object({
  title: z.string().min(3).max(255),
  date: z.string(),
  amount: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.string(),
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
    const validation = transactionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error, {
        status: statusCodes.BAD_REQUEST,
      });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...validation.data,
        userId,
        amount: Number(validation.data.amount),
      },
    });

    revalidatePath("/dashboard");
    return NextResponse.json(newTransaction, {
      status: statusCodes.CREATED,
    });
  } catch (error) {}
}
