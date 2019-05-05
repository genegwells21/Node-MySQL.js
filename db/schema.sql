CREATE DATABASE Bamazon_original;

USE Bamazon_original;


CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,

    product_name VARCHAR(100) NOT NULL,
    

    department_name VARCHAR(100) NOT NULL,
    

    price INT(50) NOT NULL,
    

    stock_quantity INT(50) NOT NULL,

    PRIMARY KEY(item_id)
    );
