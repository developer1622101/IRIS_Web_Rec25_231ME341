import { PrismaClient } from '@prisma/client'

import cron from 'node-cron'

const prisma = new PrismaClient()

cron.schedule('0 0 * * *', async () => {
  try {
    await prisma.$executeRaw` UPDATE "TOKEN" SET "dues" =  CEIL(( EXTRACT(EPOCH FROM NOW())  -  EXTRACT(EPOCH FROM "dueDate") ) / 24 * 60 * 60 * 1000   )  *  100  *( COUNT(*) from "bookWithEdition_token"  where  "bookWitEdition_token"."token_id" = "token"."id"  )  WHERE  "dueDate"   < NOW()  AND  "returned" = false  AND "collected" = true  ; `
  } catch (e) {
    console.log('error while running the task ' + e)
  }
})
