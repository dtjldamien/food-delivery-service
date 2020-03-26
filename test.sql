BEGIN;

INSERT INTO Category (catName) VALUES
('Western'),
('Japanese'),
('Korean'),
('Fast Food');

INSERT INTO Belongs (catName, rid) VALUES
('Western', 1),
('Japanese', 2),
('Korean', 3),
('Fast Food', 4);

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