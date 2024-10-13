const { createTicket, viewTicket } = require('../Controller/ticketController')
const {verifyToken} = require("../Controller/AuthMiddleware")
const router = require('express').Router()

router.route("/addTicket").post(verifyToken,createTicket)
router.route("/viewTicket").get(verifyToken,viewTicket)

module.exports = router