const router=require('express').Router();
const fetch=require('node-fetch');
const ApiUrl='https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences' || process.env.APIURL;

router.get("/all",(req,res)=>{
    fetch(ApiUrl)
    .then(res=>res.json())
    .then(function(success){
        //console.log(typeof(success.paid));
        //console.log((success.paid).length);
        for(let x=0;x<success.paid.length;x++){
            //console.log(sucess.paid[x]);  testing
            res.write(success.paid[x].confName + " is going to happen on " + success.paid[x].confStartDate + " at " + success.paid[x].venue  + " in " + success.paid[x].city + success.paid[x].country +". The conference is "+ success.paid[x].entryType +". Link for the conf is " + success.paid[x].confUrl + '\n');
        }
        res.end();
    })
    .catch(error=>{
        console.error(error.message);
    });
});

router.get("/duplicates",(req,res)=>{
    fetch(ApiUrl)
    .then(res=>res.json())
    .then(function(success){
        let s= new Set();
        for(let x=0;x<success.paid.length;x++){
            if(s.has(success.paid[x])){
                res.write(success.paid[x] + '\n');
            }else s.add(success.paid[x]);
        }
        res.end();
    }).catch(error=>{
        console.error(error.message);
    })
});

router.get("/semantic",(req,res)=>{
    fetch(ApiUrl)
    .then(res=>res.json())
    .then(function(success){
        const m=new Map();
        for(let x=0;x<success.paid.length;x++){
            const obj={
                confStartDate:success.paid[x].confStartDate,
                confEndDate:success.paid[x].confEndDate,
                long:success.paid[x].long,
                lat:success.paid[x].lat
            }
            if(m.has(obj)){
                res.write(success.paid[x]);
            }else m.set(obj,success.paid[x]);
        }
        res.end();
    }).catch(error=>{
        console.error(error.message);
    })
});

router.get("/paid",(req,res)=>{
    fetch(ApiUrl)
    .then(res=>res.json())
    .then(function(success){
        for(let x=0;x<success.paid.length;x++){
            if(success.paid[x].entryType=='Paid'){
            res.write(success.paid[x].confName + " is going to happen on " + success.paid[x].confStartDate + " at " + success.paid[x].venue  + " in " + success.paid[x].city + success.paid[x].country +". The conference is "+ success.paid[x].entryType +". Link for the conf is " + success.paid[x].confUrl + '\n');
        }}
        res.end();
    })
    .catch(error=>{
        console.error(error.message);
    });
});

router.get("/free",(req,res)=>{
    fetch(ApiUrl)
    .then(res=>res.json())
    .then(function(success){
        for(let x=0;x<success.paid.length;x++){
            if(success.paid[x].entryType=='Free'){
            res.write(success.paid[x].confName + " is going to happen on " + success.paid[x].confStartDate + " at " + success.paid[x].venue  + " in " + success.paid[x].city + success.paid[x].country +". The conference is "+ success.paid[x].entryType +". Link for the conf is " + success.paid[x].confUrl + '\n');
        }}
        res.end();
    })
    .catch(error=>{
        console.error(error.message);
    });
});

module.exports=router;