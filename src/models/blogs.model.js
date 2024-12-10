import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : [true , "title is required"]
        },

        description : {
            type : String,
            required : [true , "title is required"]
        },
        




    },
    {timestamps : true}
)

export default mongoose.model('Blog' , blogsSchema)