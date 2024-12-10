import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {

        username: {
            type: String, // Data type is String
            required: [true, 'Username is required'], // Field is required with a custom error message
            unique: true, // Ensures the username is unique
        },

        email: {
            type: String, // Data type is String
            required: [true, 'email is required'], // Field is required with a custom error message
            unique: true, // Ensures the username is unique
        },

        password: {
            type: String, // Data type is String
            required: [true, 'password is required'], // Field is required with a custom error message

        }

    },

    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

export default mongoose.model("User" , userSchema)