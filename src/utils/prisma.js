import {PrismaClient, Prisma} from "@prisma/client";

const prisma = new PrismaClient()

const products =  await prisma.product.findMany()
export default prisma;