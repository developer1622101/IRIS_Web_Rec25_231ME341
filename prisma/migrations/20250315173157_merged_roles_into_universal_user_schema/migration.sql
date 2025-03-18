/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Librarian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Librarian', 'Admin');

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_borrowerId_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Librarian";

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("rollNo")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User"("rollNo") ON DELETE RESTRICT ON UPDATE CASCADE;
