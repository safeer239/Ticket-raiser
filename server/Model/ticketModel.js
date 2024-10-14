const mongoose =require("mongoose");

const ticketSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    bugArea:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    assignedTo:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"new",
    }
},{
    timestamps:true
})

module.exports =mongoose.model("Ticket",ticketSchema)