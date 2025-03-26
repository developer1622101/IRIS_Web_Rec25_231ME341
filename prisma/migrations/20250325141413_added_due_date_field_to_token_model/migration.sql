/*
  Warnings:

  - Added the required column `dueDate` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dues" INTEGER NOT NULL DEFAULT 0;
