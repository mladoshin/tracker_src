/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `RouteStep` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RouteStep_name_key" ON "RouteStep"("name");
