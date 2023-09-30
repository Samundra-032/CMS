const mongoose = require('mongoose')

//  const Schema = mongoose.Schema
//  const userSchema=new Schema({

//})


const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        //required : true
    },

    subTitle : {
        type : String
    },

    description : {
        type : String
    }

},
{
    timestamps:true  //created at and updated at field will be created automatically by mongoDB
})


const Blog = mongoose.model("Blog", blogSchema)
module.exports=Blog;
                //Alternative
//module.exports = mongoose.model("Blog",blogSchema);

