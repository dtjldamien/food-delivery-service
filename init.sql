-- is there a need for salary? (is still in ER diagram)
-- i think doesnt matter for restaurant staff, will remove

CREATE TABLE Category (
	catName VARCHAR(100),
	PRIMARY KEY (catName)
);

CREATE TABLE Restaurants(
	rid SERIAL,
	rname VARCHAR(100) NOT NULL,
	address VARCHAR (100) NOT NULL,
	minimumSpending FLOAT NOT NULL,
	PRIMARY KEY (rid)
);

CREATE TABLE Belongs(
	catName VARCHAR(100),
	rid INTEGER,
	PRIMARY KEY (catName, rid),
	FOREIGN KEY (catName) REFERENCES Category,
	FOREIGN KEY (rid) REFERENCES Restaurants
);

CREATE TABLE RestaurantStaffs(
	rid INTEGER NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY (email),
	FOREIGN KEY (rid) REFERENCES Restaurants
);

CREATE TABLE FoodItems(
	fid SERIAL,
	fname VARCHAR(100) NOT NULL,
	description VARCHAR(250),
	price NUMERIC NOT NULL,
	PRIMARY KEY (fid)
);

CREATE TABLE Sells(
	rid INTEGER,
	fid INTEGER,
	availability INTEGER NOT NULL,
	dailyLimit INTEGER NOT NULL,
	PRIMARY KEY (rid, fid),
	FOREIGN KEY (rid) REFERENCES Restaurants,
	FOREIGN KEY (fid) REFERENCES FoodItems
);

CREATE TABLE RestaurantPromotions(
	rpid SERIAL,
	email VARCHAR(100) NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	currentCount INTEGER NOT NULL,
	promotionLimit INTEGER NOT NULL,
	PRIMARY KEY (rpid),
	FOREIGN KEY (email) REFERENCES RestaurantStaffs
);

CREATE TABLE RestaurantPriceDiscount (
	rpid INTEGER,
	priceDiscount NUMERIC NOT NULL,
	FOREIGN KEY (rpid) REFERENCES RestaurantPromotions
);

CREATE TABLE RestaurantPercentageDiscount (
	rpid INTEGER,
	PercentageDiscount NUMERIC NOT NULL,
	FOREIGN KEY (rpid) REFERENCES RestaurantPromotions
);

CREATE TABLE Discounts (
	rpid INTEGER,
	fid INTEGER,
	PRIMARY KEY (rpid, fid)
);

-- what to store type as?
-- store type as integers
-- added time 

CREATE TABLE Orders(
	oid SERIAL,
	rid INTEGER,
	address VARCHAR(100) NOT NULL,
	date DATE NOT NULL,
	time TIME NOT NULL,
	deliveryFee NUMERIC NOT NULL,
	totalCost NUMERIC NOT NULL,
	PRIMARY KEY (oid),
	FOREIGN KEY (rid) REFERENCES Restaurants
);

-- oid not included in ER diagram

CREATE TABLE Customers(
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	creditCard VARCHAR(100) NOT NULL,
	rewardPoints NUMERIC NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE Contains(
	oid INTEGER,
	fid INTEGER,
	quantity INTEGER NOT NULL,
	price NUMERIC NOT NULL,
	PRIMARY KEY (fid, oid),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (fid) REFERENCES FoodItems
);

CREATE TABLE FDSPromotions(
	pcid SERIAL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	currentCount INTEGER NOT NULL,
	redeemLimit INTEGER NOT NULL,
	PRIMARY KEY (pcid)
);

CREATE TABLE FDSPercentageDiscount (
	pcid INTEGER,
	percentageDiscount NUMERIC NOT NULL,
	PRIMARY KEY (pcid),
	FOREIGN KEY (pcid) REFERENCES FDSPromotions
);

CREATE TABLE FDSPriceDiscount (
	pcid INTEGER,
	priceDiscount NUMERIC NOT NULL,
	PRIMARY KEY (pcid),
	FOREIGN KEY (pcid) REFERENCES FDSPromotions
);

CREATE TABLE FDSManagers(
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY (username)
);

CREATE TABLE FDSLaunch(
	pcid INTEGER,
	username VARCHAR(100),
	PRIMARY KEY (pcid, username),
	FOREIGN KEY (pcid) REFERENCES FDSPromotions,
	FOREIGN KEY (username) REFERENCES FDSManagers
);

CREATE TABLE Shifts (
	shiftId SERIAL,
	shiftNo INTEGER NOT NULL,
	date DATE NOT NULL,
	startAMTime TIME NOT NULL,
	endAMTime TIME NOT NULL,
	startPMTime TIME NOT NULL,
	endPMTime TIME NOT NULL,
	PRIMARY KEY(shiftId)
);

CREATE TABLE DeliveryRiders (
	email VARCHAR(100),
	name VARCHAR(100) NOT NULL,
	vehicle VARCHAR(100) NOT NULL,
	bankAccount INTEGER NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE Schedules (
	email VARCHAR(100),
	PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES DeliveryRiders
);

CREATE TABLE ScheduleContains (
	email VARCHAR(100),
	shiftId INTEGER,
	workHours INTEGER NOT NULL,
	PRIMARY KEY (email, shiftId),
	FOREIGN KEY (email) REFERENCES Schedules,
	FOREIGN KEY	(shiftId) REFERENCES Shifts
);

CREATE TABLE PartTime (
	email VARCHAR(100),
	weeklySalary NUMERIC NOT NULL,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
);

CREATE TABLE FullTime (
	email VARCHAR(100),
	monthlySalary NUMERIC NOT NULL,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
);

CREATE TABLE Assigned (
	oid INTEGER,
	email VARCHAR(100),
	assignedDate DATE NOT NULL,
	assignedTime TIME NOT NULL,
	deliveredDate DATE,
	deliveredTime TIME,
	serviceReview INTEGER,
	PRIMARY KEY (oid, email),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
);

CREATE TABLE Apply (
	oid INTEGER,
	pcid INTEGER,
	PRIMARY KEY (oid, pcid),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (pcid) REFERENCES FDSPromotions
);

CREATE TABLE Request (
	oid INTEGER,
	email VARCHAR(100),
	payment VARCHAR(100),
	foodReview VARCHAR(250),
	rating NUMERIC,
	PRIMARY KEY (oid, email),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (email) REFERENCES Customers
);

INSERT INTO Customers VALUES ('A', 'A@email.com', 'password', 'A', 'A', 0);

INSERT INTO Restaurants (rname, address, minimumSpending) VALUES
('Fish&Co', 'ABC Street', '5'),
('Genki', 'XYZ Avenue', '5'),
('Generic KBBQ', '123 Road', '5'),
('McD', 'CS2102 Lane', '5');

INSERT INTO RestaurantStaffs VALUES (1, 'rsa@email.com', 'password', 'A');
INSERT INTO DeliveryRiders VALUES ('dra@email.com', 'A', 'SHD2020C', 00000, 'password');
INSERT INTO FDSManagers VALUES ('fdsma', 'password');