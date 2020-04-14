BEGIN;

INSERT INTO Category (catName) VALUES
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

INSERT INTO Belongs (catName, rid) VALUES 
('Western', 1),
('Japanese', 2),
('Korean', 3),
('Fast Food', 4);

COMMIT;

BEGIN;

INSERT INTO RestaurantStaffs VALUES (1, 'rsa@email.com', 'password', 'A');
INSERT INTO DeliveryRiders VALUES ('dra@email.com', 'A', 'SHD2020C', 00000, 'password');
INSERT INTO FDSManagers VALUES ('fdsma', 'password');

INSERT INTO FoodItems (fname, description, price) VALUES
('Fish & Chips', 'Straight from England!', 2.5),
('Chirashi Don', 'Japanese Food', 5.5),
('Kimchi Soup', 'Annyeong', 3.5),
('McSpicy', '$6 meal!', 6.0);

INSERT INTO Sells (rid, fid, availability, dailyLimit) VALUES
(1, 1, 10, 10),
(2, 2, 20, 20),
(3, 3, 30, 30),
(4, 4, 40, 40);

COMMIT;