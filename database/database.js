const mongoose = require("mongoose")

exports.connectDatabase = async ()=> {
    //connecting to database

    //await -> wait until connected to database
    await mongoose.connect("mongodb+srv://tanjiro:Tanjiro@cluster0.n6twqg2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
    console.log("Connected to database...")
}