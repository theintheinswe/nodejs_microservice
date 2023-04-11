const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({ 
        userId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: false,
        },       
        tags: {
          type: [String],
          default: [],
        },
        likes: {
          type: [String],
          default: [],
        }, 
        dislikes: {
          type: [String],
          default: [],
        }     
      },
      { timestamps: true }  
);

module.exports =  mongoose.model('post', PostSchema);