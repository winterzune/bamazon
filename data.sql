DROP DATABASE IF EXISTS bamazondata;

CREATE DATABASE bamazondata;

USE bamazondata;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("battletoads", games, 50.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter", books, 23.25, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("yoyo", toys, 5.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Friday", songs, 3.25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Raspberry Pi Zero", computer, 15.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("scrubs", uniforms, 13.25, 98);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milky way", snacks, 3.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("guac", food, 2.25, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nokia", phones, 1.25, 75);

