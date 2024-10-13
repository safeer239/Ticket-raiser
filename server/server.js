const express =require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv").config();
const userRoute=require("./Routes/userRoutes")
const ticketRoute=require("./Routes/ticketRoutes")
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json())
app.use("/auth",userRoute)
app.use("/ticket",ticketRoute)

const PORT =process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT)
}) 
connectDB()