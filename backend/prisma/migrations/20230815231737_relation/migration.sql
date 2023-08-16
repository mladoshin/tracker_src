/*
  Warnings:

  - A unique constraint covering the columns `[routeId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Package_routeId_key" ON "Package"("routeId");
