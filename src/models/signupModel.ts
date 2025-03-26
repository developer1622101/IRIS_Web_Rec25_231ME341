import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export const signUpModel = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      return { status: 401, msg: 'Email is already registered.' }
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await prisma.user.create({ data: { email, password: hashedPassword } })

      return { status: 201, msg: 'account created successfully.' }
    }
  } catch (e) {
    console.log(e)
    return { status: 500, msg: 'internal server error' }
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
