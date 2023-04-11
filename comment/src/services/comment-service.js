const { CommentRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, ValidationError } = require('../utils/app-errors');

// All Business logic will be here
class CommentService {

    constructor(){
        this.repository = new CommentRepository();
    }

    async createComment(commentInputs){
        try{
            const commentResult = await this.repository.CreateComment(commentInputs)
            return FormateData(commentResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async deleteComment(commentInputs){
        try{           
            const commentResult = await this.repository.FindById(commentInputs.commentId)
            if (commentInputs.userId === commentResult.userId) {
                const result =  await this.repository.FindByIdAndDelete(commentInputs.commentId);              
                return FormateData(result);
            } else {                
                throw new ValidationError("You can delete ony your comment!"); 
            }  
        }catch(err){            
            throw new APIError('Data Not found')
        }
    }
    
    async getComments(commentInputs){
        try{
            const comments = await this.repository.GetComments(commentInputs); 
            return FormateData(comments)

        }catch(err){
            throw new APIError('Data Not found')
        }
    }
     
}

module.exports = CommentService;