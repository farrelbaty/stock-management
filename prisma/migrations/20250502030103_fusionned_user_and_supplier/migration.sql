/*
  Warnings:

  - You are about to drop the column `supplierId` on the `purchaseorder` table. All the data in the column will be lost.
  - You are about to drop the `supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `purchaseorder` DROP FOREIGN KEY `PurchaseOrder_supplierId_fkey`;

-- DropIndex
DROP INDEX `PurchaseOrder_supplierId_fkey` ON `purchaseorder`;

-- AlterTable
ALTER TABLE `purchaseorder` DROP COLUMN `supplierId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `supplier`;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
