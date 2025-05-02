-- AlterTable
ALTER TABLE `product` ADD COLUMN `supplierId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
