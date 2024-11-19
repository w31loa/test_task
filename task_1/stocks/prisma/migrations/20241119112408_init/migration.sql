-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "plu" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "shop_name" TEXT,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "quantity_on_shelf" INTEGER NOT NULL,
    "quantity_in_order" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "shop_id" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_plu_key" ON "Product"("plu");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_product_id_shop_id_key" ON "Stock"("product_id", "shop_id");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("plu") ON DELETE RESTRICT ON UPDATE CASCADE;
