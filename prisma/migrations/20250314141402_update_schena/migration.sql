-- CreateTable
CREATE TABLE "Student" (
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollNo")
);

-- CreateTable
CREATE TABLE "Librarian" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Librarian_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Admin" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Book" (
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "availableCount" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "collected" BOOLEAN NOT NULL,
    "returned" BOOLEAN NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToToken" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookToToken_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookToToken_B_index" ON "_BookToToken"("B");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Student"("rollNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToToken" ADD CONSTRAINT "_BookToToken_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToToken" ADD CONSTRAINT "_BookToToken_B_fkey" FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
