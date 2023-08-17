/*
  Warnings:

  - Added the required column `name` to the `RoutePreset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutePreset" ADD COLUMN     "name" TEXT NOT NULL;
