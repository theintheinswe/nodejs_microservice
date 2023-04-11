const { PostModel } = require("../models");
const { APIError } = require('../../utils/app-errors')

//Dealing with data base operations
class PostRepository {

    async CreatePost({ userId, title, desc, imgUrl, tags}){

        try {
            const post = new PostModel({
                userId, title, desc, imgUrl, tags
            })
    
            const postResult = await post.save();
            return postResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Post')
        }
        
    }


    async Posts(){
         try{
             return await PostModel.find().sort({createdAt: -1});
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Posts')
         }
    }

    async SearchPosts({filter}){
        try{           
            return await PostModel.find({ $or: [{ title: {$regex: filter, $options: "i"} }, { desc: {$regex: filter, $options: "i"}}] });
        }catch(err){
           throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Posts')
        }
   }
   
    async FindById(id){
        try{
            return await PostModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Post')
        }

    }   
   
    async LikePost({ userId, postId}){

        try {
            const postResult = await PostModel.findByIdAndUpdate(postId,{
                $addToSet:{likes:userId},
                $pull:{dislikes:userId}
              });
            return postResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Post')
        }
        
    }

    async UnLikePost({ userId, postId}){

        try {            
            const postResult = await PostModel.findByIdAndUpdate(postId,{                
                $pull:{likes:userId}
              });
            return postResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Post')
        }
        
    }

    async DisLikePost({ userId, postId}){

        try {
            const postResult = await PostModel.findByIdAndUpdate(postId,{
                $addToSet:{dislikes:userId},
                $pull:{likes:userId}
              });
            return postResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Post')
        }
        
    }

    async UnDisLikePost({ userId, postId}){

        try {            
            const postResult = await PostModel.findByIdAndUpdate(postId,{                
                $pull:{dislikes:userId}
              });
            return postResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Post')
        }
        
    }
    
}

module.exports = PostRepository;