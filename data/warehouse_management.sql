drop database if exists warehousemanager; 
create database warehousemanager; 
use warehousemanager; 
CREATE TABLE IF NOT EXISTS `users` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `name` varchar(255) NOT NULL, 
  `username` varchar(255) NOT NULL, 
  `password` varchar(255) NOT NULL, 
  `role` varchar(255) NOT NULL, 
  `favourite_warehouse` varchar(255) DEFAULT "" NOT NULL, 
  `question` varchar(255) NOT NULL, 
  `answer` varchar(255) NOT NULL, 
  PRIMARY KEY (`id`),
  UNIQUE KEY (`username`)
); 
CREATE TABLE IF NOT EXISTS `orders` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `user_id` int NOT NULL, 
  `warehouse_key` varchar(255) NOT NULL, 
  `ordertime` timestamp NOT NULL, 
  `ready` boolean DEFAULT 0, 
  `done` boolean DEFAULT 0, 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (user_id) REFERENCES users(id) 
);
CREATE TABLE IF NOT EXISTS `products_order` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `order_id` int NOT NULL,  
  `barcode` varchar(50) NOT NULL, 
  `name` varchar(150) NOT NULL, 
  `quantity` int NOT NULL, 
  `cost` DECIMAL(10,3) NOT NULL, 
  `sale_price` DECIMAL(10,3) NOT NULL, 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`order_id`) REFERENCES orders(`id`) 
);
