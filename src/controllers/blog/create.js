import Blog from "../../models/Blog.js";
import httpstatus from "http-status";

// Controller for creating a new blog post
export const createBlog = async (req, res) => {
    try{
          // 1. Get blog data from the request body
          const {title, content, category, taggs,} = req.body;
         // const author = req.user.id; // Assuming user is authenticated and user ID is available in req.user
         // 2. Define the blog variable to store the created blog post
          let blog;
         //3. Check if blog with the same title already exists
         const existingBlog = await Blog.findOne({title});
         if(existingBlog){
            return res.status(httpstatus.CONFLICT).json({
                statusCode: httpstatus.CONFLICT,
                success: false,
                message: "A blog post with this title already exists",

            })
         }
          // 4. Create a new blog post
          blog = await Blog.create({
            title,
            content,
            category,
            tags,
            //Author
          });
           // 5. Return the created blog post
           return res.status(httpstatus.CREATED).json({
            statusCode: httpstatus.CREATED,
            success: true,
            message: "Blog post created successfully",
            data: blog,
           });
        
    }catch(error){
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpstatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred while creating the blog post",
            error: error.message,
        });
    }
}