CREATE DATABASE IF NOT EXISTS evmotors;

USE evmotors;

CREATE USER 'evmotorsusr'@'localhost' IDENTIFIED BY 'evmotors123';
GRANT ALL PRIVILEGES ON evmotors.* TO 'evmotorsusr'@'localhost';
FLUSH PRIVILEGES;
CREATE USER 'evmotorsusr'@'evmotors' IDENTIFIED BY 'evmotors123';
GRANT ALL PRIVILEGES ON evmotors.* TO 'evmotorsusr'@'evmotors';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    name VARCHAR(50),
    price FLOAT NOT NULL,
    power FLOAT NOT NULL
);

-- Insert real car data
INSERT INTO cars (brand, model, name, price, power) VALUES 
('Tesla', 'Model S', 'Tesla Model S', 79999, 670),
('Tesla', 'Model 3', 'Tesla Model 3', 39999, 480),
('Tesla', 'Model X', 'Tesla Model X', 89999, 670),
('Tesla', 'Model Y', 'Tesla Model Y', 49999, 480),
('Nissan', 'Leaf', 'Nissan Leaf', 27400, 147),
('Chevrolet', 'Bolt EV', 'Chevrolet Bolt EV', 36200, 200),
('BMW', 'i3', 'BMW i3', 44450, 170),
('Ford', 'Mustang Mach-E', 'Ford Mustang Mach-E', 42895, 346),
('Audi', 'e-tron', 'Audi e-tron', 65995, 355),
('Hyundai', 'Kona Electric', 'Hyundai Kona Electric', 37400, 201),
('Jaguar', 'I-PACE', 'Jaguar I-PACE', 69995, 394),
('Porsche', 'Taycan', 'Porsche Taycan', 105150, 522);
