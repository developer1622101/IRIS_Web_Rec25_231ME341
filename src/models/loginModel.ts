import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import bcrypt from 'bcrypt'

const loginUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  try {
    const student = await prisma.user.findUnique({
      where: { email }
    })

    if (!student) {
      return { sucess: false, msg: 'Invalid Email' }
    }

    const hashedPassword = student.password

    const check = await bcrypt.compare(password, hashedPassword)

    if (!check) {
      return { success: false, msg: 'Invalid password.' }
    }

    const session = await prisma.session.create({
      data: {
        email: student.email
      }
    })

    return { success: true, session }
  } catch (e) {
    console.log(e)
    return { success: false, msg: 'internal server error' }
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

export { loginUser }
