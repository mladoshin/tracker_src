/*
  Warnings:

  - Made the column `routeId` on table `RouteStep` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RouteStep" DROP CONSTRAINT "RouteStep_routeId_fkey";

-- AlterTable
ALTER TABLE "RouteStep" ALTER COLUMN "routeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStep" ADD CONSTRAINT "RouteStep_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
