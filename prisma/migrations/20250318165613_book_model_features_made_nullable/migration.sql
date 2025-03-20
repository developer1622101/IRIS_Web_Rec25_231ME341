/*
  Warnings:

  - The `latest_revision` column on the `BookWithEdition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revision` column on the `BookWithEdition` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Cover" DROP CONSTRAINT "Cover_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BookWithEdition" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "pages" DROP NOT NULL,
ALTER COLUMN "isbn13" DROP NOT NULL,
ALTER COLUMN "isbn10" DROP NOT NULL,
ALTER COLUMN "publish_date" DROP NOT NULL,
ALTER COLUMN "publish_date" SET DATA TYPE TEXT,
ALTER COLUMN "translated_from" DROP NOT NULL,
ALTER COLUMN "languages" DROP NOT NULL,
ALTER COLUMN "translation_of" DROP NOT NULL,
DROP COLUMN "latest_revision",
ADD COLUMN     "latest_revision" INTEGER,
DROP COLUMN "revision",
ADD COLUMN     "revision" INTEGER;

-- AlterTable
ALTER TABLE "Cover" ALTER COLUMN "bookId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
