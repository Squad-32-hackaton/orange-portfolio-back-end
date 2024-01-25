-- Create a new database called 'portfolio'
CREATE DATABASE portfolio;

USE portfolio;

-- Criação da Tabela images
CREATE TABLE
    `images` (
        `image_id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(50) NOT NULL,
        `url` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Criação da Tabela users
CREATE TABLE
    IF NOT EXISTS `users` (
        `user_id` INT AUTO_INCREMENT PRIMARY KEY,
        `first_name` VARCHAR(50) NOT NULL,
        `last_name` VARCHAR(50) NOT NULL,
        `email` VARCHAR(50) UNIQUE NOT NULL,
        `password_hash` VARCHAR(255) NOT NULL,
        `avatar_path` VARCHAR(255),
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Criação da Tabela Projects
CREATE TABLE
    `projects` (
        `project_id` INT AUTO_INCREMENT PRIMARY KEY,
        `user_id` INT,
        `title` VARCHAR(100) NOT NULL,
        `description` TEXT,
        `tag_id` INT,
        `image_id` INT,
        `link` TEXT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`user_id`) references `users` (`user_id`),
        FOREIGN KEY (`image_id`) references `images` (`image_id`)
    );

-- Criação da Tabela Tags
CREATE TABLE
    `tags` (
        `tag_id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(50) NOT NULL,
        `project_id` INT,
        `image_id` INT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`project_id`) references `projects` (`project_id`),
        FOREIGN KEY (`image_id`) references `images` (`image_id`)
    );