/*
  Warnings:

  - You are about to drop the `StockHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StockHistory" DROP CONSTRAINT "StockHistory_productId_fkey";

-- DropTable
DROP TABLE "StockHistory";

-- CreateTable
CREATE TABLE "stock_history" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "oldQuantity" INTEGER NOT NULL,
    "newQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
