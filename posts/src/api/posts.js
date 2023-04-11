const PostService = require('../services/post-service');
const UserAuth = require('./middlewares/auth')
const { validateJsonSchema } = require("./middlewares/jsonschema");

module.exports = (app) => {
    
    const service = new PostService();

    app.get('/:id', async(req,res,next) => {
        
        const postId = req.params.id;       
        try {
            const { data } = await service.GetPostById(postId);           
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });     
    
    
    app.get('/', async (req,res,next) => {            
        try {
            const { data} = await service.GetPosts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }        
    });

    app.post('/search', validateJsonSchema("post.search"), async(req,res,next) => {        
        try {            
           const { filter } = req.body;             
           const { data } =  await service.SearchPost({ filter });
           return res.json(data);            
        } catch (err) {            
            next(err)    
        }        
    });     

    app.post('/post/create', UserAuth, validateJsonSchema("post.create"), async(req,res,next) => {        
        try {           
            const { _id } = req.user;
            const { title, desc, imgUrl, tags } = req.body;             
            const { data } =  await service.CreatePost({ userId : _id, title, desc, imgUrl, tags });
            return res.json(data);            
        } catch (err) {            
            next(err)    
        }
        
    });     

    app.post('/like', UserAuth, validateJsonSchema("post.reaction"), async(req,res,next) => {
        
        const { _id } = req.user;
        const {postId } = req.body;       
        try {
            const { data } = await service.likePost({userId : _id, postId})
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }
    });

    app.post('/unlike', UserAuth, validateJsonSchema("post.reaction"), async(req,res,next) => {
        
        const { _id } = req.user;
        const {postId } = req.body;       
        try {
            const { data } = await service.unLikePost({userId : _id, postId})
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/dislike', UserAuth, validateJsonSchema("post.reaction"), async(req,res,next) => {
        
        const { _id } = req.user;
        const {postId } = req.body;       
        try {
            const { data } = await service.disLikePost({userId : _id, postId})
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });


    app.post('/undislike', UserAuth, validateJsonSchema("post.reaction"), async(req,res,next) => {
        
        const { _id } = req.user;
        const {postId } = req.body;       
        try {
            const { data } = await service.unDisLikePost({userId : _id, postId})
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });
    
}