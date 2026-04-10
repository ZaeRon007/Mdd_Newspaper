INSERT INTO `theme` (`id`, `name`, `content`)
VALUES
(1,'Sport','Articles de Sport'),
(2,'Cuisine','Articles de Cuisine'),
(3,'Actualités','Articles de Actualités'),
(4,'Politique','Articles de Politique');

INSERT INTO `users` (`id`,`name`,`email`,`password`,`created_at`,`updated_at`)
VALUES
(1,'pedro','pedro@gmail.com','$2a$10$9Ln4wYxk1zC3oXk4RUR/VO7aaDyMdw1CC2Z1fRkJRv5SfBxVDxSjK','2026-02-02 17:25:19','2026-02-02 17:25:19');

INSERT INTO `article` (`id`,`title`,`date`,`content`,`theme_id`,`user_id`)
VALUES
(5,'title5','2026-02-02 17:25:19','content',1,1),
(6,'title6','2026-02-02 17:25:19','content',2,1);

INSERT INTO `comment` (`content`,`user_id`,`article_id`)
VALUES 
('content1',1,5),
('content2',1,5),
('content3',1,5),
('content4',1,5);

INSERT INTO `user_subscribes` (`user_id`,`theme_id`)
VALUES
(1,1),
(1,2);