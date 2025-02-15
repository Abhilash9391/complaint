/*
  Warnings:

  - Added the required column `staffId` to the `solutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solutions" ADD COLUMN     "staffId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
