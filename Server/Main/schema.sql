-- BCNF
CREATE TABLE Category (
	catName VARCHAR(100),
	PRIMARY KEY (catName)
);

-- BCNF
CREATE TABLE Restaurants(
	rid SERIAL,
	rname VARCHAR(100) NOT NULL,
	address VARCHAR (100) NOT NULL,
	minimumSpending FLOAT NOT NULL,
	restaurantrating INTEGER DEFAULT 0,
	PRIMARY KEY (rid)
);

-- BCNF
CREATE TABLE Belongs(
	catName VARCHAR(100),
	rid INTEGER,
	PRIMARY KEY (catName, rid),
	FOREIGN KEY (catName) REFERENCES Category,
	FOREIGN KEY (rid) REFERENCES Restaurants
);

-- BCNF
CREATE TABLE RestaurantStaffs(
	rid INTEGER NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY (email),
	FOREIGN KEY (rid) REFERENCES Restaurants
);

-- BCNF
CREATE TABLE FoodItems(
	fid SERIAL,
	fname VARCHAR(100) NOT NULL,
	description VARCHAR(250),
	price NUMERIC NOT NULL,
	PRIMARY KEY (fid)
);

-- BCNF
CREATE TABLE Sells(
	rid INTEGER,
	fid INTEGER,
	availability INTEGER NOT NULL,
	dailyLimit INTEGER NOT NULL,
	PRIMARY KEY (rid, fid),
	FOREIGN KEY (rid) REFERENCES Restaurants,
	FOREIGN KEY (fid) REFERENCES FoodItems
        on delete cascade
        on update cascade
);

-- BCNF
CREATE TABLE RestaurantPromotions(
	rpid SERIAL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	currentCount INTEGER DEFAULT 0,
	promotionLimit INTEGER NOT NULL,
	discount NUMERIC NOT NULL,
	isPercentage BOOLEAN NOT NULL,
	PRIMARY KEY (rpid)
);

-- BCNF
CREATE TABLE RestaurantPriceDiscount (
	rpid INTEGER,
	priceDiscount NUMERIC NOT NULL,
	FOREIGN KEY (rpid) REFERENCES RestaurantPromotions
);

-- BCNF
CREATE TABLE RestaurantPercentageDiscount (
	rpid INTEGER,
	percentageDiscount NUMERIC NOT NULL,
	FOREIGN KEY (rpid) REFERENCES RestaurantPromotions
);

-- BCNF
CREATE TABLE Discounts (
	rpid INTEGER,
	fid INTEGER,
	PRIMARY KEY (rpid, fid)
);

-- 3NF
CREATE TABLE Orders(
	oid SERIAL,
	rid INTEGER,
	address VARCHAR(100) NOT NULL,
	orderDateTime TIMESTAMPTZ DEFAULT NOW(),
	deliveryFee NUMERIC NOT NULL,
	totalCost NUMERIC NOT NULL,
	PRIMARY KEY (oid),
	FOREIGN KEY (rid) REFERENCES Restaurants
);

-- BCNF
CREATE TABLE Customers(
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	creditCard VARCHAR(100) NOT NULL,
	rewardPoints NUMERIC NOT NULL,
    registeredDate DATE DEFAULT NOW(),
	PRIMARY KEY (email)
);

-- BCNF
CREATE TABLE Contains(
	oid INTEGER,
	fid INTEGER,
	quantity INTEGER NOT NULL,
	price NUMERIC NOT NULL,
	PRIMARY KEY (fid, oid),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (fid) REFERENCES FoodItems
        on delete no action
        on update cascade
);

-- BCNF
CREATE TABLE FDSPromotions(
	pcid SERIAL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	currentCount INTEGER DEFAULT 0,
	redeemLimit INTEGER NOT NULL,
	discount NUMERIC NOT NULL,
	isPercentage BOOLEAN NOT NULL,
	PRIMARY KEY (pcid)
);

-- BCNF
CREATE TABLE FDSManagers(
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY (username)
);

-- BCNF
CREATE TABLE FDSLaunch(
	pcid INTEGER,
	username VARCHAR(100),
	PRIMARY KEY (pcid, username),
	FOREIGN KEY (pcid) REFERENCES FDSPromotions,
	FOREIGN KEY (username) REFERENCES FDSManagers
        on delete set null
        on update cascade
);

-- 3NF
CREATE TABLE Shifts (
	shiftId SERIAL,
	shiftNo INTEGER NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	startTime TIME NOT NULL,
	endTime TIME NOT NULL,
	hours NUMERIC NOT NULL,
	PRIMARY KEY(shiftId)
);

-- BCNF
CREATE TABLE DeliveryRiders (
	email VARCHAR(100),
	name VARCHAR(100) NOT NULL,
	vehicle VARCHAR(100) NOT NULL,
	bankAccount INTEGER NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY (email)
);

-- BCNF
CREATE TABLE Schedules (
	email VARCHAR(100),
	PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES DeliveryRiders
        on delete cascade
        on update cascade
);

-- 3NF
CREATE TABLE ScheduleContains (
	email VARCHAR(100),
	shiftId INTEGER,
	workHours INTEGER NOT NULL,
	PRIMARY KEY (email, shiftId),
	FOREIGN KEY (email) REFERENCES Schedules,
	FOREIGN KEY	(shiftId) REFERENCES Shifts
);

-- BCNF
CREATE TABLE PartTime (
	email VARCHAR(100),
	weeklySalary NUMERIC NOT NULL,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
        on delete cascade
		on update cascade
);

-- BCNF
CREATE TABLE FullTime (
	email VARCHAR(100),
	monthlySalary NUMERIC NOT NULL,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
        on delete cascade
		on update cascade
);

-- BCNF
CREATE TABLE Assigned (
	oid INTEGER,
	email VARCHAR(100),
	assignedDateTime TIMESTAMP NOT NULL,
	deliveredDateTime TIMESTAMP,
	serviceReview INTEGER,
	PRIMARY KEY (oid, email),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
        on delete set null
		on update cascade
);

-- BCNF
CREATE TABLE Apply (
	oid INTEGER,
	pcid INTEGER,
	PRIMARY KEY (oid, pcid),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (pcid) REFERENCES FDSPromotions
);

-- BCNF
CREATE TABLE Request (
	oid INTEGER,
	email VARCHAR(100),
	payment VARCHAR(100),
	foodReview VARCHAR(250),
	rating NUMERIC,
	PRIMARY KEY (oid, email),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (email) REFERENCES Customers
        on delete cascade
		on update cascade
);