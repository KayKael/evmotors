CREATE DATABASE IF NOT EXISTS evmotors;

USE evmotors;

CREATE USER 'evmotorsusr'@'localhost' IDENTIFIED BY 'evmotors123';
GRANT ALL PRIVILEGES ON evmotors.* TO 'evmotorsusr'@'localhost';
FLUSH PRIVILEGES;
CREATE USER 'evmotorsusr'@'evmotors' IDENTIFIED BY 'evmotors123';
GRANT ALL PRIVILEGES ON evmotors.* TO 'evmotorsusr'@'evmotors';
FLUSH PRIVILEGES;


CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    power FLOAT NOT NULL
);

INSERT INTO cars (name, price, power) VALUES 
('Carro A', 30000, 150),
('Carro B', 40000, 200),
('Carro C', 50000, 250);
