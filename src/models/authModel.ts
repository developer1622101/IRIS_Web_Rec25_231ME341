import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const loginStudent = async ({
  rollNo_or_email,
  password
}: {
  rollNo_or_email: string
  password: string
}) => {
  try {
    await prismaClient.$connect()

    const student =
      (await prismaClient.user.findUnique({
        where: { rollNo: rollNo_or_email }
      })) ||
      (await prismaClient.user.findUnique({
        where: { email: rollNo_or_email }
      }))

    if (!student) {
      return { sucess: false, msg: 'Invalid RollNo./Email' }
    }

    if (password != student.password) {
      return { success: false, msg: 'Invalid password.' }
    }

    return { success: true, student }
  } catch (e) {
    console.log(e)
    return { success: false, msg: 'internal server error' }
  }
}

export { loginStudent }
