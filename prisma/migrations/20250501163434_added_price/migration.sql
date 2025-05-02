/*
  Warnings:

  - You are about to drop the column `productId` on the `purchaseitem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `purchaseorder` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `purchaseorder` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `stockmovement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `purchaseitem` DROP FOREIGN KEY `PurchaseItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `stockmovement` DROP FOREIGN KEY `StockMovement_productId_fkey`;

-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- DropIndex
DROP INDEX `PurchaseItem_productId_fkey` ON `purchaseitem`;

-- DropIndex
DROP INDEX `StockMovement_productId_fkey` ON `stockmovement`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `price` INTEGER NULL;

-- AlterTable
ALTER TABLE `purchaseitem` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `purchaseorder` DROP COLUMN `createdAt`,
    DROP COLUMN `totalAmount`;

-- AlterTable
ALTER TABLE `stockmovement` DROP COLUMN `productId`;
