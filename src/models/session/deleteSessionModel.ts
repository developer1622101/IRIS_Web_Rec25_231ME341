import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect()

export const deleteSession = async ({ id }: { id: number }) => {
  try {
    await prisma.session.delete({ where: { id } })
    await prisma.$disconnect()
    return { success: true }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
