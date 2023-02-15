<<<<<<< HEAD
=======
import array from "./amazonScrap.js"; 
>>>>>>> e740ef2e43d76f7034f5437bedaef73b68e66ffe
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors"
import * as dotenv from "dotenv"
import request from "request";
import cheerio from "cheerio";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { auth } from "./auth/auth.js";
import productRouter from './routes/product.route.js'
import userRouter from './routes/user.route.js'

dotenv.config();
const app =express();
const requested =request

const MONGO_URL=process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL)
await client.connect();


async function genHashedPassword (password){
    const NO_OF_ROUND = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUND)
    const hashed_password =await bcrypt.hash(password,salt)
    return hashed_password
    }

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT
<<<<<<< HEAD


const array = []

request('https://www.amazon.in/s?k=all&crid=3KH4GE89Z7E0Q&sprefix=%2Caps%2C484&ref=nb_sb_ss_recent_1_0_recent',(err,response,html)=>{

    const $= cheerio.load(html)

=======
>>>>>>> e740ef2e43d76f7034f5437bedaef73b68e66ffe


    $('.sg-col-4-of-20') 
    .each((i,ell)=>{
        const image = $(ell)
        .find('img')
        .attr('src')

        const title= $(ell)
        .find('.a-text-normal')
        .text()

        const rating = $(ell)
        .find('.a-icon-alt')
        .text()

        const price = $(ell)
        .find('.a-price-whole')
        .text()

        const offerPrice = $(ell)
        .find('.a-offscreen')
        .text()

        array.push({
            image,
            title,
            rating,
            price,
            offerPrice
        })
        
    })
  
})


app.get('/',auth,async function(request,response){



<<<<<<< HEAD
    const deleting = await client
=======

app.get('/',async function(request,response){

    const deletes = await client
>>>>>>> e740ef2e43d76f7034f5437bedaef73b68e66ffe
    .db('E-commerce')
    .collection('product')
    .deleteMany() 

<<<<<<< HEAD
    const result = await client
    .db('E-commerce')
    .collection('product')
    .insertMany(array)
    
=======
 names()
>>>>>>> e740ef2e43d76f7034f5437bedaef73b68e66ffe
    response.send("done")
    })


<<<<<<< HEAD
app.use("/product",productRouter)
app.use("/user",userRouter)
=======
app.get('/product',async function(request,response){
    
 const result = await client
.db('E-commerce')
.collection('product')
.find({})
.toArray();
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
>>>>>>> e740ef2e43d76f7034f5437bedaef73b68e66ffe


app.listen(PORT)

export {jwt,genHashedPassword,client,requested,request,cheerio,auth,bcrypt,array}
