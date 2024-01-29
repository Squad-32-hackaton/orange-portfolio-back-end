-- AlterTable
ALTER TABLE `Images` ADD COLUMN `filename` VARCHAR(100);

UPDATE `Images` SET `filename` = `title`;

ALTER TABLE `Images`
    DROP COLUMN `created_at`,
    DROP COLUMN `title`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `url`,
    MODIFY COLUMN `filename` VARCHAR(100) NOT NULL;