var express = require('express')
var router = express.Router()
const { query, transact } = require('./Main/db');

/* 
	When passing into a router method,

	1) if the data passed in is a single input, i.e. 1 string
		use req.query.{attributename}

	2. if the data is a json object, use req.body.{json name}
*/

/* Customer Login */
router.get('/api/get/customerLogin', (req, res, next) => {

    const email = req.query.email;
    query(`SELECT * FROM customers WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })

})

/* Delivery Rider Login */
router.get('/api/get/deliveryRiderLogin', (req, res, next) => {

    const email = req.query.email
    query(`SELECT * FROM DeliveryRiders WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })

})

/* Restaurant Staff Login */
router.get('/api/get/restaurantStaffLogin', (req, res, next) => {

    const email = req.query.email
    query(`SELECT * FROM RestaurantStaffs WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })

})

/* FDS Manager Login */
router.get('/api/get/fdsManagerLogin', (req, res, next) => {

    const username = req.query.username
    query(`SELECT * FROM FDSManagers WHERE username=$1`, [username],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })

})

/*  Register customer account */
router.post('/api/post/registerCustomer', (req, res, next) => {
    const values = [
        req.body.params.name,
        req.body.params.email,
        req.body.params.password,
        req.body.params.address,
        parseInt(req.body.params.creditCard),
        0
    ]

    console.log(values);

    query(`INSERT INTO Customers VALUES ($1, $2, $3, $4, $5, $6)`, values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res);
                return res.status(200).json(q_res);
            }
        })

})

/* Delete customer account */
router.delete('/api/delete/customer', (req, res, next) => {
    const email = req.query.email;
    console.log(email);
    query(`DELETE FROM Customers WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res);
                return res.status(200).json(q_res);
            }
        })
})

/* Update Customer Details */
router.put('/api/put/updateCustomer', (req, res, next) => {
    const values = [
        req.body.params.password,
        req.body.params.address,
        req.body.params.creditcard,
        req.body.params.email
    ]

    console.log(values)

    query(`UPDATE Customers SET password=$1, address=$2, creditCard=$3 WHERE email=$4`, values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* View past orders */
router.get('/api/get/viewPastOrders', (req, res, next) => {

    const email = req.query.email;

    query(
        `SELECT * FROM Restaurants NATURAL JOIN Orders O NATURAL JOIN Request R WHERE R.email=$1 ORDER BY orderDateTime desc`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* View Cart from Order */
router.get('/api/get/viewCartFromOrder', (req, res, next) => {

    const oid = req.query.oid

    query(
        `SELECT * FROM Contains NATURAL JOIN FoodItems WHERE oid=$1`, [oid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Create Restaurant */
router.post('/api/post/createRestaurant', (req, res, next) => {

    const values = [
        req.body.params.rname,
        req.body.params.address,
        parseFloat(req.body.params.minimumSpending)
    ]

    query(
        `INSERT INTO Restaurants (rname, address, minimumSpending) VALUES ($1, $2, $3)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Register Restaurant Staff */
router.post('/api/post/registerRestaurantStaff', (req, res, next) => {

    const values = [
        parseInt(req.body.params.rid),
        req.body.params.email,
        req.body.params.password,
        req.body.params.name
    ]

    query(
        `INSERT INTO RestaurantStaffs (rid, email, password, name) VALUES ($1, $2, $3, $4)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Delete Restaurant Staff */
router.delete('/api/delete/deleteRestaurantStaff', (req, res, next) => {

    const email = req.query.email

    query(
        `DELETE FROM RestaurantStaffs WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Update Restaurant Staff Details */
router.put('/api/put/restaurantStaff', (req, res, next) => {

    const values = [
        req.body.params.password,
        req.body.params.email
    ]

    console.log(values)

    query(
        `UPDATE RestaurantStaffs SET password=$1 WHERE email=$2`, values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Register Delivery Rider */
router.post('/api/post/registerDeliveryRider', (req, res, next) => {

    const values = [
        req.body.params.email,
        req.body.params.name,
        req.body.params.vehicle,
        parseInt(req.body.params.bankAccount),
        req.body.params.password
    ]

    console.log(req)

    query(
        `INSERT INTO DeliveryRiders (email, name, vehicle, bankAccount, password) VALUES ($1, $2, $3, $4, $5)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Delete Delivery Rider Account */
router.delete('/api/delete/deliveryRider', (req, res, next) => {

    const email = req.query.email

    query(
        `DELETE FROM DeliveryRiders WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Update Delivery Rider Account */
router.put('/api/put/updateDeliveryRider', (req, res, next) => {

    const values = [
        req.body.params.email,
        req.body.params.vehicle,
        req.body.params.bankAccount,
        req.body.params.password
    ]

    query(
        `UPDATE DeliveryRiders SET vehicle=$2, bankAccount=$3, password=$4 WHERE email=$1`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Create FDS Manager */
router.post('/api/post/createFDSManager', (req, res, next) => {

    const values = [
        req.body.params.username,
        req.body.params.password
    ]

    query(
        `INSERT INTO FdsManagers (username, password) VALUES ($1, $2)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Delete FDS Manager */
router.delete('/api/delete/deleteFDSManager', (req, res, next) => {

    const username = req.query.username

    query(
        `DELETE FROM FDSManagers WHERE username=$1`, [username],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Update FDS Manager */
router.put('/api/put/updateFDSManager', (req, res, next) => {

    const values = [
        req.body.params.username,
        req.body.params.password
    ]

    query(
        `UPDATE FDSManagers SET password=$2 WHERE username=$1`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Create Food Category */
router.post('/api/post/createCategory', (req, res, next) => {

    const category = req.query.category

    query(
        `INSERT INTO Category VALUES ($1)`, [category],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Get Food Items By Restaurant ID */
router.get('/api/get/getFoodItemsByRestaurantID', (req, res, next) => {

    const rid = req.query.rid

    query(
        /* availability < dailyLimit to check if food item is still available */
        `
            SELECT * 
            FROM FoodItems NATURAL JOIN Sells NATURAL JOIN Restaurants 
            WHERE Restaurants.rid=$1
            AND availability > 0
        `,
        [rid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Get all food categories */
router.get('/api/get/getCategories', (req, res, next) => {

    query(
        `SELECT * FROM Category`,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Get restaurants based on category name */
router.get('/api/get/getRestaurantsByCategory', (req, res, next) => {

    const category = req.query.catname

    query(
        `SELECT * FROM Category NATURAL JOIN Belongs Natural JOIN Restaurants WHERE catName=$1`, [category],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})



/* Create Food Order */
router.post('/api/post/createOrder', async (req, res) => {

    try {

        await transact(async (query) => {

            const {
                /* To be inside Orders */
                totalCost, deliveryFee, address, rid,

                /* 
                    To be mapped to iterate through the list of foods, to Contains 
                    Should be in the following format
                    [fid, price, quantity]
                */
                listOfFoods,

                /* To be inside Request */
                customerEmail, creditCard

            } = req.body

            /* First Generate The Order Entity */
            const order_id = (
                await query(
                    `
                        INSERT INTO Orders (rid, address, deliveryFee, totalCost)
                        VALUES ($1, $2, $3, $4)
                        RETURNING oid
                    `,
                    [rid, address, deliveryFee, totalCost],
                )).rows[0];
            
            /* Second, map each food item into its own Contains tuple */
            await Promise.all(listOfFoods.map((foods) => {

                const { fid, price, quantity } = foods

                return query(
                    `
                        INSERT INTO Contains (oid, fid, price, quantity)
                        VALUES ($1, $2, $3, $4)
                    `,
                    [order_id.oid, fid, price, quantity],
                    (q_err, q_res) => {
                        if (q_err) {
                            console.log(q_err.stack)
                        }
                    }
                )

            }))

            /* Finally create a Request Tuple */
            await query(
                `
                    INSERT INTO Request (oid, email, payment)
                    VALUES ($1, $2, $3)
                `,
                [order_id.oid, customerEmail, creditCard],
            )

            res.status(200).send("Order " + order_id.oid + " Successfully Completed By " + customerEmail)

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("An Error Occured")
    }

})

/* Delete Order */
router.delete('/api/delete/deleteOrder', (req, res, next) => {

    const oid = req.query.oid

    query(
        `DELETE FROM Order WHERE oid=$1`, [oid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Create Food Item */
router.post('/api/post/createFoodItem', (req, res, next) => {

    const values = [
        req.body.params.fname,
        req.body.params.description,
        req.body.params.price,
    ]

    query(
        `INSERT INTO FoodItems VALUES ($1, $2, $3)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Delete Food Item */
router.delete('/api/delete/deleteFoodItem', (req, res, next) => {

    const fid = req.query.fid

    query(
        `DELETE FROM FoodItems WHERE fid=$1`, [oid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Update Food Item */
router.put('/api/put/updateFoodItem', (req, res, next) => {

    const values = [
        req.body.params.fid,
        req.body.params.fname,
        req.body.params.description,
        req.body.params.price,
    ]

    query(
        `UPDATE FoodItems SET fname=$2, description=$3, price=$4 WHERE fid=$1`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})



/* WriteReview */
router.put('/api/put/writeReview', (req, res, next) => {

    const values = [
        req.body.params.oid,
        req.body.params.foodReview,
    ]

    query(
        `UPDATE Request SET foodReview=$1 WHERE oid=$1`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* View All Reviews */
router.get('/api/get/viewAllReviews', (req, res, next) => {

    const email = req.query.email;
    console.log(req);
    query(`SELECT R1.foodReview FROM Request R1 NATURAL JOIN Orders O NATURAL JOIN Restaurants R2 WHERE R2.rid=$1 ORDER BY O.date desc, O.time desc`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })

})

/* Create FDS Promotions */
router.post('/api/post/createFdsPromotion', (req, res, next) => {

    const values = [
        req.body.params.startDate,
        req.body.params.endDate,
        req.body.params.currentCount,
        req.body.params.redeemLimit,
        req.body.params.type
    ]

    query(
        `INSERT INTO FDSPromotions VALUES ($1, $2, $3, $4, $5, $6)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* View Reward Points */
router.get('/api/get/viewRewardPoints', (req, res, next) => {

    const email = req.query.email;
    console.log(req);
    query(`SELECT C.rewardPoints FROM Customers C WHERE C.email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })

})

/* Update Reward Points */
router.put('/api/put/updateFoodItem', (req, res, next) => {

    const values = [
        req.body.params.email,
        req.body.params.rewardPoints
    ]

    query(
        `UPDATE Customers SET rewardPoints=$2 WHERE email=$1`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Rate delivery service */
router.put('/api/put/rateDeliveryService', (req, res, next) => {

    const values = [
        req.body.params.oid,
        req.body.params.rating
    ]

    query(
        `UPDATE Request SET rating=$2 WHERE oid=$1`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

/* Rider accepts Order */
router.post('/api/post/createAssignment', (req, res, next) => {

    const values = [
        req.body.params.oid,
        req.body.params.email,
        req.body.params.assignedDateTime
    ]

    query(
        `INSERT INTO Assigned (oid, email, assignedDateTime) VALUES ($1, $2, $3)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* View Food Items */
router.get('/api/get/viewFoodItem', (req, res, next) => {

    const fid = req.query.fid;
    console.log(req);
    query(`SELECT * FROM FoodItems F WHERE F.fid=$1`, [fid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })
})

/* View 5 most recent delivery locations */
router.get('/api/get/viewRecentDeliveryLocations', (req, res, next) => {

    const email = req.query.email;
    console.log(req);
    query(`SELECT o.address FROM Customers C natural join Orders O natural join Request R WHERE c.email = $1 ORDER BY date desc, time desc LIMIT 5`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })
})

/* View total number of hours worked by the rider */
router.get('/api/get/viewTotalWorkHours', (req, res, next) => {

    const email = req.query.email;
    console.log(req);
    query(`SELECT sum(workHours) FROM ScheduleContains WHERE email = $1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })
})

/* View total number of orders delivered by a rider based on time range */
router.get('/api/get/viewTotalWorkHours', (req, res, next) => {

    const email = req.query.email;
    console.log(req);
    query(`SELECT count(*) FROM Assigned A WHERE A.email = $1 AND deliveredDateTime >= $2 AND deliveredDateTime < $3`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        })
})

/* Create Restaurant Price Discount */
router.post('/api/post/createRestaurantPriceDiscount', (req, res, next) => {

    const values = [
        req.body.params.rpid,
        req.body.params.priceDiscount
    ]

    query(
        `INSERT INTO RestaurantPriceDiscount (rpid, priceDiscount) VALUES ($1, $2)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Create Restaurant Percentage Discount */
router.post('/api/post/createRestaurantPercentageDiscount', (req, res, next) => {

    const values = [
        req.body.params.rpid,
        req.body.params.percentageDiscount
    ]

    query(
        `INSERT INTO RestaurantPercentageDiscount (rpid, percentageDiscount) VALUES ($1, $2)`,
        values,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Get restaurant promotions by restaurant staff */
router.get('/api/get/viewRestaurantPromotionsByStaff', (req, res, next) => {

    const email = req.query.email;

    query(
        `SELECT * FROM RestaurantPromotions WHERE email=$1`, [email],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )
})

/* Create Restaurant Promotions */
router.post('/api/post/createRestaurantPromotion', async (req, res) => {

    try {

        await transact(async (query) => {

            const {
                email, startDate, endDate, promotionLimit, discountValue, isPriceDiscount
            } = req.body.params

            const promo_id = (
                await query(
                    `
                        INSERT INTO RestaurantPromotions (email, startDate, endDate, promotionLimit)
                        VALUES ($1, $2, $3, $4)
                        RETURNING rpid
                    `,
                    [email, startDate, endDate, promotionLimit],
                )).rows[0];

            if (isPriceDiscount) {
                await query(
                    `INSERT INTO RestaurantPriceDiscount (rpid, priceDiscount) VALUES ($1, $2)`,
                    [promo_id.rpid, discountValue],
                    (q_err, q_res) => {
                        if (q_err) {
                            console.log(q_err.stack)
                        }
                    }
                )
            } else {
                await query(
                    `INSERT INTO RestaurantPercentageDiscount (rpid, percentageDiscount) VALUES ($1, $2)`,
                    [promo_id.rpid, discountValue],
                    (q_err, q_res) => {
                        if (q_err) {
                            console.log(q_err.stack)
                        }
                    }
                )
            }
            
            res.status(200).send("Restaurant Promo Successfully Completed")

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("An Error Occured")
    }
})

/* Create Review */
router.put('/api/put/createReview', (req, res) => {

    const {
        oid, rating, foodReview
    } = req.body.params

    query(
        `
            UPDATE Request 
            SET rating=$1, foodReview=$2 
            WHERE oid=$3
        `,
        [rating, foodReview, oid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err.stack)
                return res.status(500).send('An error has ocurred')
            } else {
                console.log(q_res.rows);
                return res.status(200).json(q_res.rows);
            }
        }
    )

})

module.exports = router