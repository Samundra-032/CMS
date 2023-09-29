const app = require("express")()

const mongoose = require("mongoose")

//connect to database
//paste the string (ie.3)
mongoose.connect("mongodb+srv://tanjiro:Tanjiro@cluster0.n6twqg2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
.then(()=>{
    console.log("DataBase Connected Successfully.......")
})


port = 2000

//GET - API
app.get("/",(req,res)=>{
    res.json({
        status:200,
        message:"successful"
    }) 
})


 
app.listen(port, (res,req)=>{
    console.log(`Server is running on port ${port}`)
})