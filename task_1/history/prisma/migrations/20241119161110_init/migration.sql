-- CreateEnum
CREATE TYPE "ACTION_TYPE_ENUM" AS ENUM ('UPDATE', 'CREATE');

-- CreateEnum
CREATE TYPE "TARGET_ENUM" AS ENUM ('PRODUCT', 'STOCK');

-- CreateTable
CREATE TABLE "HistoryAction" (
    "id" SERIAL NOT NULL,
    "action" "ACTION_TYPE_ENUM" NOT NULL,
    "target" "TARGET_ENUM" NOT NULL,
    "productPlu" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" TEXT NOT NULL,

    CONSTRAINT "HistoryAction_pkey" PRIMARY KEY ("id")
);
