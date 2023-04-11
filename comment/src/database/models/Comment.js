const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({    
    userId: {type: String, required: true},
    name: {type: String, required: true},
    postId: { type: String, required: true},
    desc: { type: String, required: true},
      
},
{   
    timestamps: true
});

module.exports =  mongoose.model('comment', CommentSchema);