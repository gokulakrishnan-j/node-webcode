import express from 'express'
import {auth} from '../index.js'
import request from "request";
import cheerio from "cheerio";
let requested = request
const Router = express.Router()



Router.get('/',auth,async function(request,response){
    
    

    var res = response

    requested('https://www.amazon.in/s?k=all&crid=3KH4GE89Z7E0Q&sprefix=%2Caps%2C484&ref=nb_sb_ss_recent_1_0_recent',async(err,response,html)=>{

    const $= cheerio.load(html)

    const array = []
    $('.sg-col-4-of-20') 
    .each(async(i,ell)=>{
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

       await array.push({
            image,
            title,
            rating,
            price,
            offerPrice
        })
        
        
    })
 res.send(array)
    
})



})

Router.get("/:name",auth,async function(request,response){
 const {name}=request.params

 let res = response

 const searchedData = []

 requested(`https://www.amazon.in/s?k=${name}&crid=3KH4GE89Z7E0Q&sprefix=%2Caps%2C484&ref=nb_sb_ss_recent_1_0_recent`,async(err,response,html)=>{
   
     const $= cheerio.load(html)
 
 
 
     $('.sg-col-4-of-20') 
     .each(async(i,ell)=>{
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
 
        await searchedData.push({
             image,
             title,
             rating,
             price,
             offerPrice
         })
         
        
     })
     res.send(searchedData)
 })



})

export default Router


