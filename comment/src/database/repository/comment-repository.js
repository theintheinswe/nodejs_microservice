const { CommentModel } = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors')


//Dealing with data base operations
class CommentRepository {

    async CreateComment({ userId, name, postId, desc }){
        try {
            const comment = new CommentModel({
                userId, name, postId, desc
            })
    
            const commentResult = await comment.save();
            return commentResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Comment')
        }
        
    }

    async FindById(id){
        try{
            return await CommentModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Comment')
        }
    }

    async FindByIdAndDelete(id){
        try{
            return await CommentModel.findByIdAndDelete(id);  
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to delete Comment')
        }
    }   

    async GetComments({postId}){
         try{
             return await CommentModel.find({ postId: postId}).sort({createdAt: -1});
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Comments')
         }
    }
   
}

module.exports = CommentRepository;