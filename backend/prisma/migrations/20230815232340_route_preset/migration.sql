-- CreateTable
CREATE TABLE "RoutePreset" (
    "id" TEXT NOT NULL,
    "steps" JSONB,

    CONSTRAINT "RoutePreset_pkey" PRIMARY KEY ("id")
);
