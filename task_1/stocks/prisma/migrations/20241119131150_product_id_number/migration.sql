/*
  Warnings:

  - Changed the type of `product_id` on the `Stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_product_id_fkey";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "product_id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stock_product_id_shop_id_key" ON "Stock"("product_id", "shop_id");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
