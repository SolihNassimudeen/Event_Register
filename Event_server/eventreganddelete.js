const mongoDb = require('./MongoDB')

const eventregister = (ucode, eventname, eventdate) => {

    return mongoDb.Event.findOne({ "Event_Date": eventdate })
        .then(result => {
            if (result) {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'Sorry, This date is already booked for an event'
                }
            }
            else {
                const newEvent = new mongoDb.Event({
                    "User_Code": ucode,
                    "Event_Name": eventname,
                    "Event_Date": eventdate
                })
                newEvent.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Registration for the event was successful'
                }
            }
        })
}

const eventlist = (ucode) => {
    if (ucode == 1001) {
        return mongoDb.Event.find()
            .then(result => {
                return {
                    statusCode: 200,
                    status: true,
                    events: result
                }
            })
    }
    else {
        return mongoDb.Event.find({ "User_Code": ucode })
            .then(result => {
                if (result) {
                    return {
                        statusCode: 200,
                        status: true,
                        events: result
                    }
                } else {
                    return {
                        statusCode: 400,
                        status: false,
                        message: 'no such an user'
                    }
                }
            })
    }
}

const history = (id) => {
    return mongoDb.Event.findOne({ "_id": id })
        .then(result => {
            if (result) {
                const newHistory = new mongoDb.Eventhistory({
                    "User_Code": result.User_Code,
                    "Deleted_Event": result.Event_Name,
                    "Deleted_Event_Date": result.Event_Date
                })
                newHistory.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: 'history successful'
                }
            }
        })
}

const deleteOne = (id) => {
    return mongoDb.Event.deleteOne({ "_id": id })
        .then(result => {
            if (result) {
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Your account successfuly deleted'
                }

            } else {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'deletion failed'
                }
            }
        })
}

const historylist=(ucode)=>{
    if (ucode == 1001) {
        return mongoDb.Eventhistory.find()
            .then(result => {
                return {
                    statusCode: 200,
                    status: true,
                    events: result
                }
            })
    }
    else {
        return mongoDb.Eventhistory.find({ "User_Code": ucode })
            .then(result => {
                if (result) {
                    return {
                        statusCode: 200,
                        status: true,
                        events: result
                    }
                } else {
                    return {
                        statusCode: 400,
                        status: false,
                        message: 'no such an user'
                    }
                }
            })
    }
}

const deletePopup=(id)=>{
    return mongoDb.Event.findOne({"_id":id})
    .then(result=>{
        if(result){
            return{
                statusCode:200,
                status:true,
                name:result.Event_Name,
                date:result.Event_Date,
                ucode:result.User_Code,
                id:result._id
            }
        }
        else{
            return{
                statusCode:400,
                status:false,
                message:'Wrong id'
            }
        }
    })
}


module.exports = { eventregister, eventlist, deleteOne, history,historylist,deletePopup }