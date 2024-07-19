const express = require('express')
const path = require('path')
const app = express()
app.use("/static",express.static(path.join(__dirname,"/public/static")))
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"public/static/test.html"))
})

const port = 8080
app.listen(port, ()=>{
  console.log(`running on ${port} : http://localhost:${port}/`)
})