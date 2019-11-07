const mongo = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const express = require("express");
const conString = "mongodb+srv://Adam_R:ZTvUypBXQK7MtqBW@cluster0-stbkn.mongodb.net/test?retryWrites=true&w=majority";
const render = require("./render-html.js");
let app;
makeConnection();
async function makeConnection(){
    
    const con = await mongo.connect(conString,{ useNewUrlParser: true, useUnifiedTopology: true });
    const db = await con.db("food-app");
    const col = await db.collection("food");
    // nu vet vi att vi har en uppkoppling till vår DB så att vi kan starta vår applikation
    app = express();
    // middleware för att kunna parsa req.body 
    app.use(express.urlencoded({extended:false}));
    app.listen(3500, function(){console.log("port: 3500")});
    // lägg kopplingen till vår kollektion till vårt app-objekt så att vi kan använda det om och om igen
    app.food = col;


    app.get("/food", async function(req,res){

        try{

            const data = await app.food.find().toArray();

            let html = data.reverse().map(function(food){

                return `
                    <h3>${food.name}</h1>
                    <p>${food.instructions}</p>
                    <img src="${food.img}">
                    <a href = "/food/delete/${food._id}">delete</a>
                    <hr>
                `;

            });
            console.log(data.length)
            res.send(render("home",html.join("")));
            

        } catch (error){
            res.send("no data");
        };




    });

    app.get("/food/create", function(req,res){

        res.sendFile(__dirname+"/form.html");


    });

    app.post("/food/create", async function(req,res){

       await app.food.insertOne(req.body);
       res.redirect("/food");


    });

    app.get("/food/delete/:id", async function(req,res){

        try {
            let id = req.params.id;

            await app.food.deleteOne({"_id": objectId(id)})
            res.redirect("/food");
       
        } catch (error) {
            res.send("delete error");
        }
    
    });

















}// end make connection