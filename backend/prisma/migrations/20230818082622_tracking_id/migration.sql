/*
  Warnings:

  - A unique constraint covering the columns `[tracking_id]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tracking_id` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "tracking_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Package_tracking_id_key" ON "Package"("tracking_id");
