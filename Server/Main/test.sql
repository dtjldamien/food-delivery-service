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
('McSpicy', '$6 meal!', 6.0),
('ButterBeer', 'Hogmeades Special!', 3.5),
('Udon', 'Slurp!', 6.5),
('Soondubu Chigae', 'Tofu Soup', 2.5),
('Filet O Fish', '$5 meal!', 5.0),
('Steak', 'Medium Rare', 35.0),
('Salmon Sushi', 'Straight from Japan!', 67.5),
('Kimchi', 'Abit Spicy', 2.5),
('Coke Zero', 'Kevs Favourite', 2.0);

INSERT INTO Sells (rid, fid, availability, dailyLimit) VALUES
(1, 1, 10, 10),
(2, 2, 20, 20),
(3, 3, 30, 30),
(4, 4, 40, 40),
(1, 5, 10, 10),
(2, 6, 20, 20),
(3, 7, 30, 30),
(4, 8, 40, 40),
(1, 9, 10, 10),
(2, 10, 20, 20),
(3, 11, 30, 30),
(4, 12, 40, 40);

COMMIT;

BEGIN;

INSERT INTO FDSPromotions (startDate, endDate, redeemLimit) VALUES
/* MM/DD/YYYY */
('01/01/2020', '06/01/2020', 100),
('01/01/2020', '06/01/2020', 100);

INSERT INTO FDSPercentageDiscount (pcid, percentageDiscount) VALUES
(1, 20);

INSERT INTO FDSPriceDiscount (pcid, priceDiscount) VALUES
(2, 20);

COMMIT;

