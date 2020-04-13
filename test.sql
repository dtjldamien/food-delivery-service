BEGIN;

INSERT INTO Category (name) VALUES
('Western'),
('Japanese'),
('Korean'),
('Fast Food');

INSERT INTO Customers VALUES ('A', 'A@email.com', 'password', 'A', 'A', 0, '2020-03-27 19:10:25-07');

INSERT INTO Restaurants (rname, address, minimumSpending) VALUES
('Fish&Co', 'ABC Street', '5'),
('Genki', 'XYZ Avenue', '5'),
('Generic KBBQ', '123 Road', '5'),
('McD', 'CS2102 Lane', '5');

COMMIT;

BEGIN;

INSERT INTO RestaurantStaffs VALUES (9, 'rsa@email.com', 'password', 'A');
INSERT INTO DeliveryRiders VALUES ('dra@email.com', 'A', 'SHD2020C', 00000, 'password');
INSERT INTO FDSManagers VALUES ('fdsma', 'password');

INSERT INTO FoodItems (fname, description, price, catid) VALUES
('Fish & Chips', 'Straight from England!', 2.5, 9),
('Chirashi Don', 'Japanese Food', 5.5, 10),
('Kimchi Soup', 'Annyeong', 3.5, 11),
('McSpicy', '$6 meal!', 6.0, 12);

INSERT INTO Sells (rid, fid, availability, dailyLimit) VALUES
(9, 1, 10, 10),
(10, 2, 20, 20),
(11, 3, 30, 30),
(12, 4, 40, 40);

COMMIT;