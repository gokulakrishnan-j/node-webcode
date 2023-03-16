import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()

export const auth = (request,response,next)=>{
    try{
        
        const token = request.header("my_token");
        
        jwt.verify(token,process.env.SECERET_KEY);
        
        next();
    }catch (err) {
        response.status(401).send(err.message)
    }
}
