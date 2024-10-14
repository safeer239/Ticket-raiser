const asyncHandler = require("express-async-handler");
const Ticket = require("../Model/ticketModel");
const User = require("../Model/userModel");
;

const createTicket = asyncHandler(async (req, res) => {
  const { bugArea, description, assignedTo } = req.body;

  if (!description || !bugArea || !assignedTo) {
    res.status(401);
    throw new Error("All fields are required");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    bugArea: bugArea,
    description: description,
    assignedTo: assignedTo,
  });
  const assignedUser = await User.findById(assignedTo);

  if (!assignedUser) {
    res.status(404);
    throw new Error("Assigned user not found");
  }

  assignedUser.tickets.push(ticket._id);

  await assignedUser.save();
  res.status(201).json(ticket);
});

const viewTicket = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log(req.user.name)
  const tickets = await Ticket.find({ assignedTo: userId });
  res.status(200).json(tickets);
});

const updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  ticket.status = status;
  await ticket.save();

  res.status(200).json(ticket);
});

module.exports = { createTicket, viewTicket,updateTicketStatus };
