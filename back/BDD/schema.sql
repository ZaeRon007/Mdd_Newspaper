CREATE TABLE IF NOT EXISTS `article` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50),
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `content` VARCHAR(5000),
  `theme_id` INT,
  `user_id` INT
);

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` VARCHAR(2000),
  `user_id` INT,
  `article_id` INT
);

CREATE TABLE IF NOT EXISTS `theme` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40),
  `content` VARCHAR(2000)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `user_subscribes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT, 
  `theme_id` INT
);

ALTER TABLE `article` ADD FOREIGN KEY (`theme_id`) REFERENCES `theme`(`id`);
ALTER TABLE `article` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `comment` ADD FOREIGN KEY (`article_id`) REFERENCES `article`(`id`);

ALTER TABLE `user_subscribes` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `user_subscribes` ADD FOREIGN KEY (`theme_id`) REFERENCES `theme`(`id`);
