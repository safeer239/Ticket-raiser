const { register, login, getUser } = require('../Controller/userController')

const router = require('express').Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/users").get(getUser)

module.exports = router