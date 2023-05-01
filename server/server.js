
import express from "express";
const app = express();
import dotenv from "dotenv"
dotenv.config()
import mysql2 from "mysql2";
import cors from "cors";
import db from "./db/conn.js"
import router from "./Routes/Router.js";
const port = process.env.PORT 

//rout check
// app.get('/',(req,res)=>{
//     res.send("server is start")
// })


// middleware
app.use(express.urlencoded({
    extended:true}));
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port,(err)=>{
    if (err) throw err;
    else{
        console.log(`server is reunning on port :${port}`);
    }
})