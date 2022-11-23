import request from "request";
import cheerio from "cheerio";

const array = []
request('https://www.amazon.in/s?k=toys&crid=3KH4GE89Z7E0Q&sprefix=%2Caps%2C484&ref=nb_sb_ss_recent_1_0_recent',(err,response,html)=>{
   // console.log(html)
    const $=cheerio.load(html)



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

export default array;