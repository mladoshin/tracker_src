-- DropForeignKey
ALTER TABLE "RouteStep" DROP CONSTRAINT "RouteStep_routeId_fkey";

-- AlterTable
ALTER TABLE "RouteStep" ALTER COLUMN "routeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RouteStep" ADD CONSTRAINT "RouteStep_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
