import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const loginUser = async ({
  rollNo_or_email,
  password
}: {
  rollNo_or_email: string
  password: string
}) => {
  try {
    const student =
      (await prisma.user.findUnique({
        where: { rollNo: rollNo_or_email }
      })) ||
      (await prisma.user.findUnique({
        where: { email: rollNo_or_email }
      }))

    if (!student) {
      return { sucess: false, msg: 'Invalid RollNo./Email' }
    }

    if (password != student.password) {
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
