const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const dotenv=require('dotenv');
const router=require('./router');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const PORT=3000 || process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Root")
})

app.use("/fetch",router);
app.listen(PORT, () => console.log(`The server is online at port ${PORT}`));