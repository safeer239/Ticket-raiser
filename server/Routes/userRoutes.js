const { register, login } = require('../Controller/userController')

const router = require('express').Router()

router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router