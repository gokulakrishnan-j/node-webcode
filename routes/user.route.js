import express from 'express'
import {jwt,auth,genHashedPassword,bcrypt} from '../index.js'
import { users, getingUser, storeUser, userToken, logout  } from '../service/user.service.js'

const Router = express.Router()

async function createUser(userDetails){
    const user = await users(userDetails)
   
    return user
   }
   


   
   async function getUserName(email){
       const users = await getingUser(email)
       
       return users
   }
   
   
   Router.post("/signup",async function (request,response){
      const {username,password,email} = request.body
   
    
     
      // getting username from database to check it already exit
      const userFromDB = await getUserName(email)
   
      //validating if username is already exit
      if(userFromDB){
       response.status(400).send("username alreay exists")
      }
      //validating is password is not lesser then 8 character
      else if(password.length < 8){
       response.status(400).send("password must be 8 characters")
      }
      
      else{
       // getting send and geting hash password
       const hashedPassword=await genHashedPassword(password)
       
       //creating a user by name and hash password
       const result = await createUser({
           username:username,
           password:hashedPassword,
           email:email
       })
       response.send(result)
      }
   })

   Router.post("/login",async function (request,response){
    const {email,password}=request.body
    

    // getting username from database to check it already exit
    const userFromDB = await getUserName(email)

    if(! userFromDB){
        response.status(401).send("Invalid credentials")
    }
    else{
        const storedDBPassword = userFromDB.password

        const isPasswordMatch= await bcrypt.compare(password,storedDBPassword)

        if(isPasswordMatch){
            const token = jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
           
            const storeTokenInDB = await storeUser(userFromDB, token)
            
            response.send({message : "successful login",
        token:token})


        }
        else{
            response.status(401).send("Invalid credentials")
        }


    }
})


Router.get("/token/:email",async function(request,response){

    const {email} = request.params
            
    const getToken = await userToken(email)
    
   
    response.send(getToken)
})

    
Router.delete("/logout/:email",auth,async function(request,response){
    const {email} = request.params
    const deleteToken = await logout(email)
    response.send(deleteToken)
})

export default Router

