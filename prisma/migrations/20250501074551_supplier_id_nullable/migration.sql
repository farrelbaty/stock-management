-- DropForeignKey
ALTER TABLE `purchaseorder` DROP FOREIGN KEY `PurchaseOrder_supplierId_fkey`;

-- DropIndex
DROP INDEX `PurchaseOrder_supplierId_fkey` ON `purchaseorder`;

-- AlterTable
ALTER TABLE `purchaseorder` MODIFY `supplierId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
