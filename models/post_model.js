import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true},
    likes: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('post', postSchema);

export default UserModel;
