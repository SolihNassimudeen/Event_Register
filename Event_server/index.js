const express=require('express')
const cors=require('cors')
const loginregister=require('./LoginRegister')
const event=require('./eventreganddelete')

const app=express()
app.use(express.json())

app.use(cors({
    orgin:'http://localhost:4200'
}))

app.post('/register',(req,res)=>{
    loginregister.register(req.body.fname,req.body.sname,req.body.email,req.body.dob,req.body.pswd,req.body.mnumber)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/login',(req,res)=>{
    loginregister.login(req.body.email,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/eventregister',(req,res)=>{
    event.eventregister(req.body.ucode,req.body.eventname,req.body.eventdate)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/eventlist',(req,res)=>{
    event.eventlist(req.body.ucode)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/history',(req,res)=>{
    event.history(req.body.id)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deleteOne/:id',(req,res)=>{
    event.deleteOne(req.params.id)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/historylist',(req,res)=>{
    event.historylist(req.body.ucode)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/deletePopup',(req,res)=>{
    event.deletePopup(req.body.id)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(3001,()=>{
    console.log('Server listening to port number 3001')
})