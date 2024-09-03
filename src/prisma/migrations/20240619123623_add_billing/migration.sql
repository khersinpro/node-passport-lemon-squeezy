-- CreateEnum
CREATE TYPE "Country" AS ENUM ('US', 'UK', 'FR', 'BE');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'GBP', 'EUR');

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lemon_store_id" INTEGER NOT NULL,
    "description" TEXT,
    "country" "Country" NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lemon_product_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "lemon_order_id" INTEGER,
    "lemon_customer_id" INTEGER,
    "lemon_receipt_link" TEXT,
    "lemon_store_id" INTEGER,
    "lemon_order_number" INTEGER,
    "lemon_product_id" INTEGER,
    "currency" "Currency",
    "status" TEXT,
    "refunded_at" TIMESTAMP(3),
    "total_price" DOUBLE PRECISION,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_lemon_store_id_key" ON "Store"("lemon_store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_lemon_product_id_key" ON "Product"("lemon_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_lemon_order_id_key" ON "Order"("lemon_order_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
