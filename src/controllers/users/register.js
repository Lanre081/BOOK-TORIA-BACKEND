import httpstaus from "http-status";
import User from "../../models/user.js";

//controller for user registration
export const register = async (req, res) =>{
    try{
        //1. Get user input
        const {username, email, password, role} = req.body
        //2.Define the user  variable to store the user data
        let user;
        //3. Check if the user already exists in the database
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(httpstatus.CONFLICT).json({
                statuscode: httpstatus.CONFLICT,
                success: false,
                message: "user already exist with this email",
            })
        }
         //4. Create a new user
         User = await User.create({username, email, password, role});
          //5. Return a success response with the created user data
          return res.status(httpstatus.CREATED).json({
            statuscode: httpstaus.CREATED,
            success: true,
            message: "user created successfully",
            data:{
               id: user._id,
               profilePicture: user.profilePicture,
               username: user.username,
               email: user.email,
               role: user.role,
            },
          });

    } catch(error){
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            statuscode: httpstaus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred during registration",
            error: error.message,
        });
    }
};