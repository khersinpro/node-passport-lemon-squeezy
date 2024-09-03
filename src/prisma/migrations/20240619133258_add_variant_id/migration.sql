-- DropIndex
DROP INDEX "Product_lemon_product_id_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "lemon_variant_id" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "lemon_variant_id" INTEGER NOT NULL DEFAULT 1;
