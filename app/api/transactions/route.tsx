import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import statusCodes from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const transactionSchema = z.object({
  date: z.date(),
  amount: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.string(),
  userId: z.string(),
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
      },
    });

    return NextResponse.json(newTransaction, {
      status: statusCodes.CREATED,
    });
  } catch (error) {}
}
