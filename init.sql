CREATE TABLE RestaurantStaffs(
	rsid INTEGER,
	rid INTEGER,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	name VARCHAR(100) NOT NULL,
	salary INTEGER NOT NULL,
	PRIMARY KEY (rsid),
	FOREIGN KEY (rid) REFERENCES Restaurants
);

-- is there a need for salary? (is still in ER diagram)

CREATE TABLE Restaurants(
	rid INTEGER,
	rname VARCHAR(100) NOT NULL,
	address VARCHAR (100) NOT NULL,
	minimumSpending FLOAT NOT NULL,
	PRIMARY KEY (rid)
);

CREATE TABLE FoodItems(
	fid INTEGER,
	fname VARCHAR(100) NOT NULL,
	description VARCHAR(250),
	price NUMERIC NOT NULL,
	PRIMARY KEY (fid)
);

-- belongs category weak entity, how to do?

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
	fid INTEGER,
	rsid INTEGER,
	type VARCHAR(32),
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	promotionLimit INTEGER NOT NULL,
	priceDiscount NUMERIC,
	percentageDiscount NUMERIC,
	PRIMARY KEY (fid, rsid),
	FOREIGN KEY (fid) REFERENCES FoodItems,
	FOREIGN KEY (rsid) REFERENCES RestaurantStaffs
);

-- what to store type as?

CREATE TABLE Orders(
	oid INTEGER,
	address VARCHAR(100) NOT NULL,
	dateTime DATE NOT NULL,
	deliveryFee NUMERIC NOT NULL,
	totalCost NUMERIC NOT NULL,
	PRIMARY KEY (oid)
);

-- oid not included in ER diagram

CREATE TABLE Customers(
	cid INTEGER,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	creditCard VARCHAR(100) NOT NULL,
	rewardPoints NUMERIC NOT NULL,
	PRIMARY KEY (cid)
);

CREATE TABLE Contains(
	oid INTEGER,
	fid INTEGER,
	quantity INTEGER NOT NULL,
	PRIMARY KEY (fid, oid),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (fid) REFERENCES FoodItems
);