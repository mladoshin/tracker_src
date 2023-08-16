-- DropForeignKey
ALTER TABLE "RouteStep" DROP CONSTRAINT "RouteStep_routeId_fkey";

-- AddForeignKey
ALTER TABLE "RouteStep" ADD CONSTRAINT "RouteStep_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
