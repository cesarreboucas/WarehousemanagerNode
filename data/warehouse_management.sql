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
  `product_id` varchar(50) NOT NULL,
  `quantity` int NOT NULL,
  `cost` DECIMAL(10,3) NOT NULL,
  `sale_price` DECIMAL(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES orders(`id`)
);


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

insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, '374283214725046', 28, 10, 15);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (32, '5002353454266214', 46, 11, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '201587668358131', 46, 11, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (20, '5602248167330014', 39, 12, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (9, '201705156461122', 44, 9, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, '676211693006821700', 47, 10, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '3563335198874391', 37, 10, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (5, '201555574470266', 40, 10, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, '4026387527196417', 46, 10, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (31, '67095433453852806', 48, 10, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (5, '491156280482824530', 42, 12, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '3582936924893576', 25, 9, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, '5168785903838103', 35, 12, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '3544713560029790', 32, 12, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, '3543910668499435', 14, 13, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (16, '201710568242649', 39, 13, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '4175006994851051', 37, 11, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, '4903440828061018', 12, 13, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, '56022275298126941', 30, 11, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (16, '6759594025637531', 35, 12, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (4, '3542700343501445', 23, 10, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, '3569975755250206', 48, 13, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, '3546125755261237', 19, 12, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (5, '30297800525467', 17, 11, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (29, '30344248581452', 10, 13, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, '5471559547981898', 15, 10, 15);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (9, '5602213634094817', 20, 13, 15);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (37, '67712481141068130', 40, 13, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, '3531047234173824', 43, 13, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '56022430144358889', 27, 13, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (12, '5602236779197821484', 43, 10, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (32, '201686796835455', 44, 9, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (9, '3558203804117596', 44, 9, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, '3554344652340908', 40, 11, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (20, '5100136595561929', 31, 13, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (34, '5893249624233773', 10, 13, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, '4041376754742499', 22, 11, 15);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (8, '5100175022647760', 12, 13, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (37, '4041370656803', 18, 10, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (34, '4041597675254674', 48, 12, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, '3547559124059253', 22, 12, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (25, '3559719781070002', 26, 13, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (38, '343959268878272', 48, 12, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (32, '3545062281664900', 13, 12, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (12, '3575497770667118', 18, 13, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (38, '3547420363475801', 30, 9, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (12, '6762683157411008', 23, 12, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (18, '3569885699380995', 31, 13, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (8, '5020369082023726', 18, 11, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '3533290585847376', 35, 10, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, '3568630813814821', 20, 11, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, '560221722127722820', 45, 13, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (32, '5641826843240351024', 36, 13, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (28, '4917023478889773', 17, 10, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (34, '6381597950297771', 23, 12, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (22, '5602224723906225', 19, 9, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '56022443700218900', 17, 12, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (1, '3535500880991374', 48, 11, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, '5010124775519965', 35, 11, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (21, '5299973835259430', 39, 12, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, '5151485823626634', 35, 11, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '201747899454196', 32, 9, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, '5602218785992495', 42, 13, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, '491134732739400644', 12, 9, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, '374622246986540', 13, 11, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '5481308184058893', 49, 13, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (37, '589352754390414462', 41, 11, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (25, '3569429055366189', 33, 9, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, '6385478583479332', 30, 10, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '30346446193170', 13, 10, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, '4917614761710633', 38, 9, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '3549603231681365', 12, 12, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (31, '3587607538359164', 41, 9, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (13, '3553793735798766', 33, 12, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (33, '30339068234786', 35, 9, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, '3586262058132616', 36, 12, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, '560221352716933651', 27, 9, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, '3568395829464785', 37, 12, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (1, '3545608066942406', 10, 11, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, '201848236547682', 13, 11, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, '3540235243285122', 36, 9, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, '3546932307671684', 20, 10, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (31, '3562795898914600', 17, 11, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (19, '3583919509729182', 34, 10, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (12, '3576793462513001', 43, 13, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, '6334158605283407', 17, 11, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '5108751845609633', 15, 10, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, '3539817613637173', 49, 12, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (13, '560222225086338074', 13, 11, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (16, '5100172706121261', 50, 13, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (22, '3586532063827792', 37, 12, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, '5610694563663534', 12, 11, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (30, '3528734973410864', 12, 9, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (29, '501867205210155796', 49, 10, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (8, '3541419515309765', 26, 13, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, '5602242811787604', 41, 12, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (22, '3576788297180497', 28, 10, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, '3541980366709510', 14, 13, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, '3557907941461375', 22, 10, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, '5411829079472324', 26, 9, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (37, '4936619774003873', 41, 10, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (18, '564182131034565950', 47, 13, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (26, '3581275589427508', 35, 10, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (31, '3574102713135089', 44, 12, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (5, '3584960116474001', 22, 12, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (17, '50382781687065340', 11, 13, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, '501861367994025060', 26, 13, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (16, '4508275975023547', 21, 11, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (1, '3569671756757212', 50, 10, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, '3539503406672292', 33, 12, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, '5610867285592146', 23, 11, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (37, '30470201287652', 28, 12, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, '3541051903968629', 32, 13, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (9, '3575328875284725', 17, 13, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, '6334385335091514200', 32, 10, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, '374283568556849', 33, 9, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, '3540754259873704', 36, 13, 15);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (6, '5108754599869940', 11, 13, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (36, '3544783621633526', 49, 13, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, '3567940665134504', 15, 13, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (12, '491129570089909583', 21, 11, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (35, '372684745909359', 15, 11, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, '3537164293545463', 37, 10, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (11, '3586227195431395', 34, 10, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (20, '5218202607186623', 30, 11, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (6, '4175007392875429', 25, 13, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (23, '3585104644024843', 42, 12, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (33, '5100139568831816', 29, 13, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (27, '201721312960899', 47, 12, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (9, '0604787307633570', 11, 11, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (28, '201405064155201', 26, 13, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (18, '3562772676803297', 44, 13, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (8, '5010129885599005', 35, 12, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (29, '3571579853466288', 23, 10, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (10, '3534898344139346', 19, 10, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (18, '5602211985763444', 45, 13, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (14, '5100142604652881', 28, 9, 19);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (33, '3555521313273680', 32, 13, 16);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (15, '3554733871385191', 34, 9, 18);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (36, '5602253063828574', 49, 12, 21);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (38, '3559748944208183', 28, 13, 24);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (1, '3541525706430051', 33, 9, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (5, '5211749370460715', 18, 10, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (31, '36836595721064', 27, 10, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (4, '5108758636929732', 26, 10, 20);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (28, '201856354170120', 46, 13, 22);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (39, '6334484260288170550', 48, 9, 17);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (7, '5602253490090673', 44, 10, 25);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (20, '5048372224912606', 39, 11, 23);
insert into products_order (order_id, product_id, quantity, cost, sale_price) values (3, '3548091932691209', 40, 12, 20);