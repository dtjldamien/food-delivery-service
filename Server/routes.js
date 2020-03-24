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
router.get('/api/get/login', (req, res, next) => {

	const email = req.query.email;
	console.log(req);
	pool.query(`SELECT * FROM customers WHERE email=$1`, [email],
		(q_err, q_res) => {
		if (q_err) {
			console.log(q_err.stack)
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
			} else {
				console.log(q_res.rows);
				return res.json(q_res.rows);
			}
		}
	)
})



module.exports = router