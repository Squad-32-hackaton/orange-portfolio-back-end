-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_project_id_fkey`;

-- AddForeignKey
ALTER TABLE `Tags`
ADD CONSTRAINT `Tags_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;