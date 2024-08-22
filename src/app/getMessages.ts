"use server";
import { PrismaClient } from "@prisma/client";

import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const getMessages = async () => {
  return prisma.message.findMany();
};

export const sendMessage = async (text: string) => {
  await prisma.message.create({
    data: {
      id: uuidv4(),
      text,
    },
  });
};
