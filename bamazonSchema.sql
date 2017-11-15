CREATE DATABASE bamazon; 

USE bamazon;

CREATE TABLE products (
	item_id int auto_increment NOT NULL, 
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price int(10),
	stock_quantity int(10),
	UNIQUE(item_id)
);