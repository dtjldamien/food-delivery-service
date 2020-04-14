CREATE TABLE Restaurants(
	rid SERIAL,
	rname VARCHAR(100) NOT NULL,
	address VARCHAR (100) NOT NULL,
	minimumSpending FLOAT NOT NULL,
	PRIMARY KEY (rid)
);

CREATE TABLE RestaurantStaffs(
	rid INTEGER,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY (email),
	FOREIGN KEY (rid) REFERENCES Restaurants
);

CREATE TABLE Category (
	name VARCHAR(100),
	PRIMARY KEY (name)
);

CREATE TABLE FoodItems(
	fid SERIAL,
	fname VARCHAR(100) NOT NULL,
	description VARCHAR(250),
	price NUMERIC NOT NULL,
	catid VARCHAR(100) NOT NULL,
	PRIMARY KEY (fid),
	FOREIGN KEY (catid) REFERENCES Category
);

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

CREATE TABLE RestaurantPromotions(
	rpid SERIAL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	currentCount INTEGER NOT NULL,
	promotionLimit INTEGER NOT NULL,
	PRIMARY KEY (rpid)
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

CREATE TABLE Orders(
	oid SERIAL,
	address VARCHAR(100) NOT NULL,
	orderDateTime DATE NOT NULL,
	deliveryFee NUMERIC NOT NULL,
	totalCost NUMERIC NOT NULL,
	PRIMARY KEY (oid)
);

CREATE TABLE Customers(
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	creditCard VARCHAR(100) NOT NULL,
	rewardPoints NUMERIC DEFAULT (0),
	registeredDate DATE DEFAULT NOW(),
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
		on delete no action
		on update cascade
);

CREATE TABLE FDSPromotions(
	pcid SERIAL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	redeemLimit INTEGER NOT NULL,
	currentCount INTEGER NOT NULL,
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
		on delete set null
		on update cascade
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
		on delete cascade
		on update cascade
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
		on delete cascade
		on update cascade
);

CREATE TABLE FullTime (
	email VARCHAR(100),
	monthlySalary NUMERIC NOT NULL,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
		on delete cascade
		on update cascade
);

CREATE TABLE Assigned (
	oid INTEGER,
	email VARCHAR(100),
	serviceReview INTEGER,
	assignedDate DATE NOT NULL,
	assignedTime TIME NOT NULL,
	deliveredDate DATE,
	deliveredTime TIME,
	PRIMARY KEY (oid, email),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (email) REFERENCES DeliveryRiders
		on delete set null
		on update cascade
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
	foodReview INTEGER,
	PRIMARY KEY (oid, email),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (email) REFERENCES Customers
		on delete cascade
		on update cascade
);



