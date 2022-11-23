import array from "./scrapingData/amazonScrap.js"; 
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors"
import * as dotenv from "dotenv"

dotenv.config();
const app =express();

const MONGO_URL=process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL)
await client.connect();


app.use(express.json())
app.use(cors())
const PORT = process.env.PORT




async function names (){
const result = await client
.db('E-commerce')
.collection('product')
.insertMany(array)


    
}



app.get('/',async function(request,response){

    const result = await client
    .db('E-commerce')
    .collection('product')
    .deleteMany() 

    names()
    response.send("done")
    })


app.get('/product',async function(request,response){
    
 const result = await client
.db('E-commerce')
.collection('product')
.find({})
.toArray();
console.log(result.length)
response.send(result)
})

app.get("/product/:name",async function(request,response){
const {name}=request.params
    const search = await client
    .db('E-commerce')
    .collection('product')
    .find({title:{$regex:name.replace(/yes/g,'')}})
    .toArray()
   search ? response.send(search) : response.status(400).send(`product not available:${name}`)
})



app.listen(PORT,console.log(`the server start in:${PORT}`))
