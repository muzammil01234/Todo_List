import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Listmodel from './model.js';
import dotenv from 'dotenv';
const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());
let count=0;
app.post('/form-submit',(req,res)=>{
    let data=req.body;
    let newList =new Listmodel({
        id:++count,
        content:req.body.content

    })
    newList.save()
    .then(()=>{
        console.log("new List added to database succesfully");
    })
    .catch((err)=>{
        console.log("There was an error writing to database");
    })
    res.status(200).json({message:"Data saved succesfully"});
})

app.get('/get',(req,res)=>{
    Listmodel.find({})
    .then((data)=>{
        res.status(200).json(data);
        console.log("Data sent");
    })
    .catch((err)=>{
        console.log("Error getting data");
    })
})
app.delete('/delete/:id',(req,res)=>{
    Listmodel.findByIdAndDelete(req.params.id)
    .then((data)=>{
        console.log("Deleted Successfully");
        app.redirect('/get');
    })
    .catch((err)=>{
        console.log("There is an error deleting data");
    })
    res.status(200).json({message:"Deleted"});

})
app.put('/update/:id',(req,res)=>{
    Listmodel.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>{
        console.log("Updated successfully");
    })
    .catch((err)=>{
        console.log("There is an error");
    })
    res.status(200).json({message:"updated"});
})
app.listen(4000,()=>{
    console.log("Your server is listening on port 4000");
})
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log("Error connnecting to database");
})