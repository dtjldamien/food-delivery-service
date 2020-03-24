BEGIN;

INSERT INTO Restaurants (rname, address, minimumSpending) VALUES
('Fish&Co', 'ABC Street', '5'),
('Genki', 'XYZ Avenue', '5'),
('Generic KBBQ', '123 Road', '5'),
('McD', 'CS2102 Lane', '5');

INSERT INTO Category (catName) VALUES
('Western'),
('Japanese'),
('Korean'),
('Fast Food');

INSERT INTO FoodItems (fid, fname, description, price, catName) VALUES
('Fish & Chips', 'Straight from England!', 2.5, 'Western'),
('Chirashi Don', 'Japanese Food', 5.5, 'Japanese'),
('Kimchi Soup', 'Annyeong', 3.5, 'Korean'),
('McSpicy', '$6 meal!', 6.0, 'Fast Food');

INSERT INTO Sells (rid, fid, availability, dailyLimit) VALUES
(2, 1, 10, 10),
(3, 2, 20, 20),
(4, 3, 30, 30),
(5, 4, 40, 40);

COMMIT;