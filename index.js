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





app.use("/product",productRouter)
app.use("/user",userRouter)


app.listen(PORT)

export {jwt,genHashedPassword,client,requested,cheerio,auth,bcrypt}
