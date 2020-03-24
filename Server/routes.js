var express = require('express')
var router = express.Router()
var pool = require('./Main/db')

/* 
	When passing into a router method,

	1) if the data passed in is a single input, i.e. 1 string
		use req.query.{attributename}

	2. if the data is a json object, use req.body.{json name}
*/

/* Customer Login */
router.get('/api/get/customerLogin', (req, res, next) => {

	const email = req.query.email;
	console.log(req);
	pool.query(`SELECT * FROM customers WHERE email=$1`, [email],
		(q_err, q_res) => {
		if (q_err) {
			console.log(q_err.stack)
			return done()
		} else {
			console.log(q_res.rows);
			return res.json(q_res.rows);
		}
	})

})

/* Delivery Rider Login */
router.get('/api/get/deliveryRiderLogin', (req, res, next) => {

	const email = req.query.email
	pool.query(`SELECT * FROM DeliveryRiders WHERE email=$1`, [email],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		})

})

/* Restaurant Staff Login */
router.get('/api/get/restaurantStaffLogin', (req, res, next) => {

	const email = req.query.email
	pool.query(`SELECT * FROM RestaurantStaffs WHERE email=$1`, [email],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		})

})

/* FDS Manager Login */
router.get('/api/get/fdsManagerLogin', (req, res, next) => {

	const username = req.query.username
	pool.query(`SELECT * FROM FDSManagers WHERE username=$1`, [username],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(`INSERT INTO Customers VALUES ($1, $2, $3, $4, $5, $6)`, values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res);
				return res.json(q_res);
			}
	})
	
})

/* Delete customer account */
router.delete('/api/delete/customer', (req, res, next) => {
	const email = req.query.email;
	console.log(email);
	pool.query(`DELETE FROM Customers WHERE email=$1`, [email],
		(q_err, q_res) => {
		if (q_err) {
			console.log(q_err.stack)
			return done()
		} else {
			console.log(q_res);
			return res.json(q_res);
		}
	})
})

/* Update Customer Details */
router.put('/api/put/updateCustomer', (req, res, next) => {
	const values = [
		req.body.params.password,
		req.body.params.address,
		req.body.params.creditCard,
		req.body.params.email
	]

	console.log(values)

	pool.query(`UPDATE Customers SET password=$1, address=$2, creditCard=$3 WHERE email=$4`, values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)
})

/* View past orders */
router.get('/api/get/viewPastOrders', (req, res, next) => {

	const email = req.query.email;

	pool.query(
		`SELECT * FROM Orders O NATURAL JOIN Request R NATURAL JOIN Customers C WHERE C.email=$1 ORDER BY date desc, time desc`,
		[email],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(
		`INSERT INTO Restaurants (rname, address, minimumSpending) VALUES ($1, $2, $3)`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(
		`INSERT INTO RestaurantStaffs (rid, email, password, name) VALUES ($1, $2, $3, $4)`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)

})

/* Delete Restaurant Staff */
router.delete('/api/delete/deleteRestaurantStaff', (req, res, next) => {

	const email = req.query.email

	pool.query(
		`DELETE FROM RestaurantStaffs WHERE email=$1`,
		[email],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)
})

/* Update Restaurant Staff Details */
router.put('/api/put/restaurantStaff', (req, res, next) => {

	const values = [
		req.body.params.email,
		req.body.params.password
	]

	console.log(values)

	pool.query(
		`UPDATE RestaurantStaffs SET password=$2 WHERE email=$1`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(
		`INSERT INTO DeliveryRiders (email, name, vehicle, bankAccount, password) VALUES ($1, $2, $3, $4, $5)`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)
})

/* Delete Delivery Rider Account */
router.delete('/api/delete/deliveryRider', (req, res, next) => {

	const email = req.query.email

	pool.query(
		`DELETE FROM DeliveryRiders WHERE email=$1`,
		[email],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(
		`UPDATE DeliveryRiders SET vehicle=$2, bankAccount=$3, password=$4 WHERE email=$1`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(
		`INSERT INTO FdsManagers (username, password) VALUES ($1, $2)`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)

})

/* Delete FDS Manager */
router.delete('/api/delete/deleteFDSManager', (req, res, next) => {

	const username = req.query.username

	pool.query(
		`DELETE FROM FDSManagers WHERE username=$1`,
		[username],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
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

	pool.query(
		`UPDATE FDSManagers SET password=$2 WHERE username=$1`,
		values,
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)

})

/* Create Food Category */
router.post('/api/post/createCategory', (req, res, next) => {

	const category = req.query.category

	pool.query(
		`INSERT INTO Category VALUES ($1)`,
		[category],
		(q_err, q_res) => {
			if (q_err) {
				console.log(q_err.stack)
				return done()
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)
})

module.exports = router