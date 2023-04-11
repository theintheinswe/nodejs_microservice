const CommentService = require("../services/comment-service");
const UserAuth = require('./middlewares/auth');
const { validateJsonSchema } = require("./middlewares/jsonschema");

module.exports = (app) => {
    
    const service = new CommentService();

    app.post('/create', UserAuth, validateJsonSchema("comment.create"), async(req,res,next) => {        
        try {
            const { _id, name } = req.user;            
            const { postId, desc } = req.body;             
            const { data } =  await service.createComment({ userId : _id, name, postId, desc });
            return res.json(data);            
        } catch (err) {            
            next(err)    
        }        
    });

    app.delete('/:id', UserAuth, async(req,res,next) => {        
        try {    
            const { _id } = req.user;
            const commentId = req.params.id;             
            const { data } =  await service.deleteComment({ userId : _id, commentId : commentId });
            return res.json(data);            
        } catch (err) {            
            next(err)    
        }        
    });

     
    app.get('/:id', async (req,res,next) => {
        try {           
            const postId = req.params.id; 
            const { data} = await service.getComments({postId : postId });        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }        
    });
       
     
}