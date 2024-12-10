import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}Blogging_Web`
        )
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    }

    catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1); // Exit process on failure
    }
}

export default connectDB

//BlogBlog