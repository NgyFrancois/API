import mongoose from "mongoose";

const LikeSchema = mongoose.Schema(
    {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        required: true 
    }
    },
    {
        timestamps: true,
    }
);

const LikeModel = mongoose.model('Like', LikeSchema);

export default LikeModel;