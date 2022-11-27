const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/EVENTAPP',{
    useNewUrlParser:true
})

const Ucode=mongoose.model('Ucode',{
    initialUcode:Number,
    finalUcode:Number
})

const User=mongoose.model('User',{
    User_Code:Number,
    First_Name:String,
    Second_Name:String,
    Email:String,
    Data_Of_Birth:Date,
    Password:String,
    Mobile_Number:Number
})

const Event=mongoose.model('Event',{
    User_Code:Number,
    Event_Name:String,
    Event_Date:Date
})

const Eventhistory=mongoose.model('Eventhistory',{
    User_Code:Number,
    Deleted_Event:String,
    Deleted_Event_Date:Date
})

module.exports={User, Ucode, Event, Eventhistory}