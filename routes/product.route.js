import express from 'express'
import {requested,request,cheerio,auth} from '../index.js'
import { resuting } from '../service/produt.service.js'

const Router = express.Router()





Router.get('/',auth,async function(request,response){
    
   

 const result = await resuting();

response.send(result)
})

Router.get("/:name",auth,async function(request,response){
 const {name}=request.params


 const searchedData = []

 requested(`https://www.amazon.in/s?k=${name}&crid=3KH4GE89Z7E0Q&sprefix=%2Caps%2C484&ref=nb_sb_ss_recent_1_0_recent`,(err,response,html)=>{
   
     const $= cheerio.load(html)
 
 
 
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
 
         searchedData.push({
             image,
             title,
             rating,
             price,
             offerPrice
         })
         
        
     })
     hi(searchedData)
 })

 function hi(d){
    response.send(d)
 }

})

export default Router


