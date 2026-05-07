import Blog from "../../models/Blog.js";
import httpStatus from "http-status";


// Controller for updating blog post:
const updateBlog = async(req, res) =>{
    try{
         
    // 1. Get user ID from the request parameters
    const {id} = req.params;

    // 2. Get the data to be updated user data from the request body
    const {title, content, category, author } = req.body;
     // 3. Find the user by ID and update the blog
     const updateBlog = await Blog.findByIdAndUpdate(
        id,
        {title: title, content: content, category: category, author: author },
        {new: true},
     );
     
     if(!updateBlog){
            return res.status(httpStatus.NOT_FOUND).json({
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "Blog not found",
            });
             }
            res.status(httpStatus.OK).json({
                 statusCode: httpStatus.OK,
                 success: true,
                 message: "Blog details updated successfully",
                 data: updateBlog,
                    });
    }catch(error){
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                  statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                  success: false,
                  message: "Error updating blog details",
                  error: error.message,
                 });
    }
}
export { updateBlog };