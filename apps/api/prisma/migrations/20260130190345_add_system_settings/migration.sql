-- AlterTable
ALTER TABLE "Order" ADD COLUMN "trackingUrl" TEXT;

-- CreateTable
CREATE TABLE "SystemSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "description" TEXT
);
