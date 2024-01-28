-- AlterTable
ALTER TABLE `images`
    ADD COLUMN `filename` VARCHAR(100);

UPDATE `images`
    SET `filename` = `title`;

ALTER TABLE `images`
    DROP COLUMN `created_at`,
    DROP COLUMN `title`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `url`,
    MODIFY COLUMN `filename` VARCHAR(100) NOT NULL;