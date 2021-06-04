const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;
const cors=require("cors")

const axios = require('axios');
app.use(cors())
const instance = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc',
  headers: {
    'Authorization': `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`
  }
});
async function getRelatedProducts(id) {
  try {
    let response = await instance.get(`/products/${id}/related`)
    let relatedProductIds = response.data
    console.log(relatedProductIds)
    let responses = await Promise.all(relatedProductIds.map(id => instance.get(`/products/${id}`)))
    let relatedProduct = responses.map(response => response.data)
    return relatedProduct
  } catch (error) {
    console.log(error)
  }
}
app.get("/data/:id", async (req, res) => {
  console.log(req.params.id)
  let data = await getRelatedProducts(req.params.id)
  res.send(data)


})

app.get("/rating/:id", async (req,res)=>{
try{

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta?product_id=${req.params.id}`,{headers: {
    'Authorization': `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` 
  }
})
  .then((response)=>{
  res.send(response.data)
  })
  .catch((error)=>
  console.log(error)
  )
}

catch(error){
  console.log(error)
}

})
app.get("/image/:id", async (req,res)=>{
  try{
  
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.id}/styles`,{headers: {
      'Authorization': `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` 
    }
  })
    .then((response)=>
    res.send(response.data.results[0].photos[0].thumbnail_url)
    )
    .catch((error)=>
    console.log(error)
    )
  }
  
  catch(error){
    console.log(error)
  }
  
  })
app.get("/product/:id", async (req,res)=>{
  try{
  
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.id}`,{headers: {
      'Authorization': `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` 
    }
  })
    .then((response)=>
    res.send(response.data)
    )
    .catch((error)=>
    console.log(error)
    )
  }
  
  catch(error){
    console.log(error)
  }
  

})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "index.html"))
})
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

