/*
//connect to database
//paste the string (ie.3)
// mongoose.connect("mongodb+srv://tanjiro:Tanjiro@cluster0.n6twqg2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
// .then(()=>{
//     console.log("DataBase Connected Successfully.......")
// })
*/

const { connectDatabase } = require("./database/database")
//const mongoose = require("mongoose")

const Blog = require("./model/blogModel")

//const app = require("express")()
const express = require("express")
const app = express()

//setting environment for external html css
app.set('view engine', 'ejs')
//parse the data coming from the form
app.use(express.json())
app.use(express.urlencoded({extended : true}))


//for getting access of css and images
app.use(express.static("public"))
//DataBase Connection Function
connectDatabase()

port = 3000

/*******************************
            GET - API
*******************************/
app.get("/",(req,res)=>{
    // res.json({
    //     status:200,
    //     message:"successful"
    // }) 
    res.render('home')//no need of views/home.ejs  --> render always point to views folder
})



/*******************************
            GET - API   for ABOUT
*******************************/
app.get("/about",(req,res)=>{ 
    res.render('about')//no need of views/home.ejs  --> render always point to views folder
})

/*********************************** 
    GET API => /blogs (All blogs)
************************************/
app.get("/blogs",async (req,res)=>{

    /*********************************************************
        fetching (reading all Blogs from Blog Model)
    *********************************************************/
   const blogs = await Blog.find()

   if(blogs.length == 0){
    // return   res.status(401).send('No blog found')
    res.status(404).json({
        //status: 404,
        message:'no blog found'
    })
   }
   else{
    // return    res.status(200).send(blogs);
    res.status(200).json({
        //status : 200,
        message :"Blogs fetched successful",
        data : blogs
    })

   }

    // res.json({
    //     status : 200,
    //     message : "Blog fetched successfully",
    //     data : blogs
    // })
})



/*********************************************************
 *      GET API --> /blogs/:id (single Blog read)
 *********************************************************/
app.get('/blogs/:id', async(req , res )=>{
    const id = req.params.id
    //const {id} = req.params

    // const  blog = await Blog.find({_id : id})
    // if(blog.length == 0){
    //     res.status(404).json({
    //         message : `Blog not found from ${id}`,
    //     })
    // }
    // else(
    //     res.json({
    //         status : 200,
    //         message:"blog fetched succesfully" ,
    //         data : blog
    
    //     })

    // )

    const blog = await Blog.findById(id)
    if(!blog ){
        res.status(404).json({
            message : 'No such a blog exists!'
        })
    }else{
        res.status(200).json({
            message: "Blog successfully fetched",
            data : blog
        })
    }

})


/*********************************************************
 *                       UPDATE API 
 *********************************************************/
app.patch('/blogs/:id',async (req,res)=>{
    const id = req.params.id 
    const {title,subTitle,description} = req.body

    /*******************************
     * Checking the id exist or not
     ********************************/
    const isBlogFound = await Blog.find({
        _id : id
    })


    if (!isBlogFound || !isBlogFound[0]){
        return   res.status(404).json({
            message:'no such a blog'
        })
    }

    // if(title === title || subTitle === subTitlle || description === description){
    //     return res.status(200).json({
    //         message:"You haven't changed any thing in this blog"
    //     })
    // }
    else{
        await Blog.findByIdAndUpdate(id,{
            title,
            subTitle,
            description
        })

        res.status(200).json({
            message :"Updated Successfully!"
        })
    }



})


/*********************************************************
 *                       Delete API 
 *********************************************************/
app.delete('/blogs/:id', async (req,res)=>{
    const id = req.params.id
    // const {id} = req.params

    const isBlogFound = await Blog.find({
        _id : id
    })

    if (!isBlogFound || !isBlogFound[0]){
        return   res.status(404).json({
            message:'no such a blog Please check your Id'
        })
    }
    else{
        await Blog.findByIdAndDelete(id)
    
        res.status(200).json({
            message:"Deleted Successfully"
        })
    }

})

//Alternative
//res.status(200).json({ Message : "Blog created successfully",})



/*******************************************
            Create Blog API
********************************************/
app.post("/blogs",async (req,res)=>{

    // console.log(req.body)
    // console.log(req.body.title)

    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description

    /*
    //alternative --> object destructuring
    //const {title, subTitle, description} = req.body

    //Insert to database (logic goes here)
    // await Blog.create({
    //     title: req.body.title,
    //     subTitle: req.body.subTitle,
    //     description: req.body.description
    // })
    */

    
     
    /***************************
     * //if key and value is same then can write only once
    title,
    subTitle,
    description

    * //can be written as 
    *****************************************/
    const titleBlogFound = await Blog.find({
        title : title
    })
    if(!titleBlogFound || !titleBlogFound[0]){
        
        await Blog.create({
            title :title,
            subTitle : subTitle,
            description : description
        })

        res.json({
            status : 201,
            Message : "Blog created successfully",
        })
    }

    else{
        return   res.status(409).send("blog Title already exists")
    }




})
 




app.listen(port, (res,req)=>{
    console.log(`Server is running on port ${port}`)
})