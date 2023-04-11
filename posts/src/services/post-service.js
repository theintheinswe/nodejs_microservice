const { PostRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class PostService {

    constructor(){
        this.repository = new PostRepository();
    }

    async CreatePost(postInputs){
        try{            
            const postResult = await this.repository.CreatePost(postInputs)
            return FormateData(postResult);
        }catch(err){            
            throw new APIError('Data Not found')
        }
    }
    
    async GetPosts(){
        try{
            const posts = await this.repository.Posts();    
            return FormateData(posts);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }    
    
    async SearchPost(postInputs){
        try{
            const posts = await this.repository.SearchPosts(postInputs);    
            return FormateData(posts);
        }catch(err){
            throw new APIError('Data Not found')
        }
    } 
   
    async GetPostById(postId){
        try {            
            const post = await this.repository.FindById(postId);            
            return FormateData(post);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
    
    
    async likePost(postInputs){
        try{            
            const postResult = await this.repository.LikePost(postInputs)
            return FormateData(postResult);
        }catch(err){            
            throw new APIError('Data Not found')
        }
    }

    async unLikePost(postInputs){
        try{       
            const postResult = await this.repository.UnLikePost(postInputs)
            return FormateData(postResult);
        }catch(err){            
            throw new APIError('Data Not found')
        }
    }

    async disLikePost(postInputs){
        try{            
            const postResult = await this.repository.DisLikePost(postInputs)
            return FormateData(postResult);
        }catch(err){            
            throw new APIError('Data Not found')
        }
    }

    async unDisLikePost(postInputs){
        try{       
            const postResult = await this.repository.UnDisLikePost(postInputs)
            return FormateData(postResult);
        }catch(err){            
            throw new APIError('Data Not found')
        }
    }
     
}

module.exports = PostService;