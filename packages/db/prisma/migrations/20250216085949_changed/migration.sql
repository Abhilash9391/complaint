/*
  Warnings:

  - You are about to drop the `solutions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "solutions" DROP CONSTRAINT "solutions_complaintId_fkey";

-- DropForeignKey
ALTER TABLE "solutions" DROP CONSTRAINT "solutions_staffId_fkey";

-- DropTable
DROP TABLE "solutions";

-- CreateTable
CREATE TABLE "Solution" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complaintId" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "Complaints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
