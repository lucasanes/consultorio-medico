/*
  Warnings:

  - A unique constraint covering the columns `[doctorId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctorId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "doctorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_doctorId_key" ON "Address"("doctorId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
