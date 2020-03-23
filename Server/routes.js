var express = require('express')
var router = express.Router()
var pool = require('./Main/db')

router.get('/api/hello', (req, res) => {
	res.json('hello world')
})

router.get('/api/get/allpizzas', (req, res, next) => {
	pool.query(`SELECT * FROM pizzas`,
			(q_err, q_res) => {
				res.json(q_res.rows);
				console.log(q_res.rows);
	})
})

router.get('/api/get/allcustomers', (req, res, next) => {
	pool.query(`SELECT * FROM customers`,
			(q_err, q_res) => {
				res.json(q_res.rows);
	})
})

router.get('/api/get/allsells', (req, res, next) => {
	pool.query(`SELECT * FROM sells`,
			(q_err, q_res) => {
				res.json(q_res.rows);
	})
})

module.exports = router