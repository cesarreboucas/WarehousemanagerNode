drop DATABASE if EXISTS warehousemanager;
CREATE DATABASE warehousemanager;
use warehousemanager;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL, 
  `warehouse_id` int NOT NULL,
  `ordertime` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS `products_order`;
CREATE TABLE IF NOT EXISTS `products_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL, 
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `cost` DECIMAL(10,3) NOT NULL,
  `sale_price` DECIMAL(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES orders(`id`)
);

/*
insert into users (name, username, password, role, question, answer) values ('Belita Dachey', 'bdachey1@geocities.com', 'GkPQkOHSmYJ', 'admin', 'What was my first pet''s name?', 'Toto');
insert into users (name, username, password, role, question, answer) values ('Mella Galbraeth', 'mgalbraethe@purevolume.com', '5zUxEe1eethJ', 'associate', 'What was the last name of my childhood best friend?', 'Wick');
insert into users (name, username, password, role, question, answer) values ('Salaidh Bagenal', 'sbagenalm@wunderground.com', 'asLhlfwD', 'associate', 'What was my favorite subject in school?', 'Physical education');
insert into users (name, username, password, role, question, answer) values ('Heall Castagne', 'hcastagne0@foxnews.com', 'PU1YQZjC', 'client', 'Where did I first meet my significant other?', 'Vancouver');
insert into users (name, username, password, role, question, answer) values ('Yalonda De Normanville', 'yde2@businesswire.com', '1z4evy', 'client', 'What was my favorite subject in school?', 'Mathematics');
insert into users (name, username, password, role, question, answer) values ('Ilise Rosin', 'irosin3@biglobe.ne.jp', 'UME8Dql9', 'client', 'What was my first pet''s name?', 'Fido');
insert into users (name, username, password, role, question, answer) values ('Arty Wallsworth', 'awallsworth6@mtv.com', 't23tuurTqPOG', 'client', 'What was my favorite game as a child?', 'Truth or Dare');
insert into users (name, username, password, role, question, answer) values ('Nona Megarrell', 'nmegarrell7@taobao.com', 'y8sc3XnQ0gqI', 'client', 'Who was my most memorable school teacher?', 'Ms. Sarah');
insert into users (name, username, password, role, question, answer) values ('Jaine Jirik', 'jjirik8@home.pl', '8pWjzzM2FLo', 'client', 'What was my favorite toy as a child?', 'Videogame');
insert into users (name, username, password, role, question, answer) values ('Cecil Hancox', 'chancox9@google.pl', 'JeyNnjeQJY', 'client', 'Who was my most memorable school teacher?', 'Ms. Paloma');
*/

insert into orders (user_id, warehouse_id, ordertime) values (7, 2, '2019-10-03 13:05:25');
insert into orders (user_id, warehouse_id, ordertime) values (10, 3, '2019-10-03 23:59:36');
insert into orders (user_id, warehouse_id, ordertime) values (6, 4, '2019-10-04 08:39:56');
insert into orders (user_id, warehouse_id, ordertime) values (10, 2, '2019-10-05 08:32:16');
insert into orders (user_id, warehouse_id, ordertime) values (4, 4, '2019-10-06 16:06:56');
insert into orders (user_id, warehouse_id, ordertime) values (6, 4, '2019-10-06 20:48:02');
insert into orders (user_id, warehouse_id, ordertime) values (4, 2, '2019-10-07 09:24:16');
insert into orders (user_id, warehouse_id, ordertime) values (7, 2, '2019-10-08 19:12:53');
insert into orders (user_id, warehouse_id, ordertime) values (8, 1, '2019-10-08 19:29:06');
insert into orders (user_id, warehouse_id, ordertime) values (6, 1, '2019-10-09 15:27:29');
insert into orders (user_id, warehouse_id, ordertime) values (5, 2, '2019-10-09 17:50:02');
insert into orders (user_id, warehouse_id, ordertime) values (6, 4, '2019-10-09 21:50:59');
insert into orders (user_id, warehouse_id, ordertime) values (4, 3, '2019-10-11 19:34:15');
insert into orders (user_id, warehouse_id, ordertime) values (10, 3, '2019-10-12 23:52:19');
insert into orders (user_id, warehouse_id, ordertime) values (10, 3, '2019-10-13 08:32:29');
insert into orders (user_id, warehouse_id, ordertime) values (7, 4, '2019-10-13 17:08:23');
insert into orders (user_id, warehouse_id, ordertime) values (7, 4, '2019-10-14 15:47:38');
insert into orders (user_id, warehouse_id, ordertime) values (6, 2, '2019-10-14 16:45:55');
insert into orders (user_id, warehouse_id, ordertime) values (7, 3, '2019-10-15 15:25:22');
insert into orders (user_id, warehouse_id, ordertime) values (6, 1, '2019-10-16 18:03:11');
insert into orders (user_id, warehouse_id, ordertime) values (4, 1, '2019-10-16 20:29:10');
insert into orders (user_id, warehouse_id, ordertime) values (7, 4, '2019-10-16 23:08:06');
insert into orders (user_id, warehouse_id, ordertime) values (10, 1, '2019-10-17 08:18:21');
insert into orders (user_id, warehouse_id, ordertime) values (6, 1, '2019-10-18 18:58:51');
insert into orders (user_id, warehouse_id, ordertime) values (6, 3, '2019-10-20 22:48:38');
insert into orders (user_id, warehouse_id, ordertime) values (5, 3, '2019-10-21 06:51:20');
insert into orders (user_id, warehouse_id, ordertime) values (9, 2, '2019-10-21 23:56:42');
insert into orders (user_id, warehouse_id, ordertime) values (7, 3, '2019-10-22 07:33:30');
insert into orders (user_id, warehouse_id, ordertime) values (10, 1, '2019-10-22 16:25:51');
insert into orders (user_id, warehouse_id, ordertime) values (4, 2, '2019-10-22 18:51:51');
insert into orders (user_id, warehouse_id, ordertime) values (10, 4, '2019-10-23 00:08:35');
insert into orders (user_id, warehouse_id, ordertime) values (9, 4, '2019-10-23 05:50:24');
insert into orders (user_id, warehouse_id, ordertime) values (8, 3, '2019-10-23 16:30:58');
insert into orders (user_id, warehouse_id, ordertime) values (6, 4, '2019-10-25 13:47:05');
insert into orders (user_id, warehouse_id, ordertime) values (8, 1, '2019-10-25 15:00:54');
insert into orders (user_id, warehouse_id, ordertime) values (8, 3, '2019-10-25 17:52:18');
insert into orders (user_id, warehouse_id, ordertime) values (7, 4, '2019-10-25 22:01:07');
insert into orders (user_id, warehouse_id, ordertime) values (4, 3, '2019-10-27 17:05:26');
insert into orders (user_id, warehouse_id, ordertime) values (5, 1, '2019-10-29 12:17:26');
insert into orders (user_id, warehouse_id, ordertime) values (8, 1, '2019-10-30 22:28:52');

insert into products_order (order_id, product_id, quantity, cost, sale_price) values (1, 7, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (1, 10, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (2, 29, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, 3, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, 8, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (4, 3, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (4, 12, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (5, 13, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (6, 31, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (6, 37, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, 44, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, 49, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (8, 20, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (8, 41, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (9, 37, 1, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (10, 4, 1,  15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (10, 10, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, 4, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, 42, 1,15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (12, 9, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (13, 2, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, 1, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, 6, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, 15, 1,15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, 19, 1, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (16, 43, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (16, 47, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, 24, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (18, 44, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, 18, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (20, 12, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (20, 29, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (21, 24, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (22, 35, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, 5, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, 39, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (24, 1, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (24, 18, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (25, 1, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, 50, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, 49, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, 50, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (28, 18, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (28, 41, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (29, 41, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (30, 5, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (30, 12, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (30, 15, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (31, 6, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (32, 22, 1,15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (32, 39, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (33, 1, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (33, 3, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (34, 4, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (34, 26, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, 39, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, 41, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, 45, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (36, 9, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (37, 26, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (38, 4, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (38, 23, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (38, 34, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, 31, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, 39, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (40, 6, 1, 15.2, 20.3);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (40, 8, 1, 15.2, 20.3);