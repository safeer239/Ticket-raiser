const asyncHandler = require("express-async-handler");
const Ticket = require("../Model/ticketModel");

const createTicket=asyncHandler(async(req,res)=>{
    const { bugArea,description,assignedTo}=req.body

    if(!description || !bugArea || !assignedTo){
        res.status(401)
        throw new Error("All fields are required")
    }

    const ticket = await Ticket.create({
        user:req.user.id,
        bugArea:bugArea,
        description:description,
        assignedTo:assignedTo
    })
    res.status(201).json(ticket)
})

const viewTicket =asyncHandler(async(req,res)=>{
    const tickets=await Ticket.find()
    res.status(200).json(tickets)
})

module.exports ={createTicket,viewTicket}