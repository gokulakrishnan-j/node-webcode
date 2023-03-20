import jwt from "jsonwebtoken"

export const auth = (request,response,next)=>{
    try{
        
        const token = request.header("my_token");
        
        jwt.verify(token,process.env.SECRET_KEY);
        
        next();
    }catch (err) {
        response.status(401).send(err.message)
    }
}
