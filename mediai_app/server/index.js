const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PatentModel = require('./models/patents')

const app = express()
 
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/patents")


app.get('/getPatents' , (req,res)=>{
    PatentModel.find()
    .then(patents => res.json(patents))
    .catch(err => res.json(err))

})

app.listen(3001 , ()=> {
    console.log("server is running")
})
