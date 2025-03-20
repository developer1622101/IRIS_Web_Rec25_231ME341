/*
  Warnings:

  - Added the required column `coverId` to the `Cover` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cover_id_key";

-- AlterTable
CREATE SEQUENCE cover_id_seq;
ALTER TABLE "Cover" ADD COLUMN     "coverId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('cover_id_seq');
ALTER SEQUENCE cover_id_seq OWNED BY "Cover"."id";
