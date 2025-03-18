/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `edition` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `_BookToToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToToken" DROP CONSTRAINT "_BookToToken_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToToken" DROP CONSTRAINT "_BookToToken_B_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "author",
DROP COLUMN "edition",
DROP COLUMN "publisher",
ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Book_id_seq";

-- DropTable
DROP TABLE "_BookToToken";

-- CreateTable
CREATE TABLE "BookWithEdition" (
    "id" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "editionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "availableCount" INTEGER NOT NULL,
    "isbn13" TEXT NOT NULL,
    "isbn10" TEXT NOT NULL,
    "noOfEditions" INTEGER NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL,
    "translated_from" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "translation_of" TEXT NOT NULL,
    "latest_revision" TEXT NOT NULL,
    "revision" TEXT NOT NULL,

    CONSTRAINT "BookWithEdition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cover" (
    "id" INTEGER NOT NULL,
    "bookWithEditionId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookWithEditionToPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookWithEditionToPublisher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BookWithEditionToToken" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookWithEditionToToken_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BookToPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookToPublisher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AuthorToBook_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AuthorToBookWithEdition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AuthorToBookWithEdition_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_id_key" ON "Cover"("id");

-- CreateIndex
CREATE INDEX "_BookWithEditionToPublisher_B_index" ON "_BookWithEditionToPublisher"("B");

-- CreateIndex
CREATE INDEX "_BookWithEditionToToken_B_index" ON "_BookWithEditionToToken"("B");

-- CreateIndex
CREATE INDEX "_BookToPublisher_B_index" ON "_BookToPublisher"("B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");

-- CreateIndex
CREATE INDEX "_AuthorToBookWithEdition_B_index" ON "_AuthorToBookWithEdition"("B");

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_bookWithEditionId_fkey" FOREIGN KEY ("bookWithEditionId") REFERENCES "BookWithEdition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookWithEditionToPublisher" ADD CONSTRAINT "_BookWithEditionToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "BookWithEdition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookWithEditionToPublisher" ADD CONSTRAINT "_BookWithEditionToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookWithEditionToToken" ADD CONSTRAINT "_BookWithEditionToToken_A_fkey" FOREIGN KEY ("A") REFERENCES "BookWithEdition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookWithEditionToToken" ADD CONSTRAINT "_BookWithEditionToToken_B_fkey" FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToPublisher" ADD CONSTRAINT "_BookToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToPublisher" ADD CONSTRAINT "_BookToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBookWithEdition" ADD CONSTRAINT "_AuthorToBookWithEdition_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBookWithEdition" ADD CONSTRAINT "_AuthorToBookWithEdition_B_fkey" FOREIGN KEY ("B") REFERENCES "BookWithEdition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
