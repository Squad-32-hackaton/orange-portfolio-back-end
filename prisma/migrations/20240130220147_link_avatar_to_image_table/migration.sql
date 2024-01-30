/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` 
    DROP COLUMN `avatar`,
    ADD COLUMN `avatar_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `Images`(`image_id`) ON DELETE SET NULL ON UPDATE CASCADE;
