import LikeModel from "../models/like_model.js";
import { findUserByUsername } from "../lib/user_controller.js";
import { findPost, incrementLikes, decrementLikes } from "../lib/post_controller.js";

export const getLikes = async (req, res) => {
    const likes = await LikeModel.find();
    res.status(200).json(likes);
};

export const setLike = async (req, res) => {
    if(!req.body.author || !req.body.post){ // author = user.username, post = post._id
        res.status(400).json("Merci d'ajouter un author et un post");
    } 
    const user = await findUserByUsername(req.body.author);
    const post = await findPost(req.body.post);

    //console.log(user);
    //console.log(post);

    if(!user || !post){
        res.status(400).json("user ou post incorrect");
    }

    // Vérifier s'il existe déjà un like pour ce user et ce post
    const existingLike = await LikeModel.findOne({
        user: user._id,
        post: post._id,
    });
      
    if (existingLike) {
        return res.status(400).json("Like déjà existant");
    }

    const like = await LikeModel.create({
        user: user,
        post: post
    });

    await incrementLikes(req.body.post);

    res.status(200).json(like);
};

export const deleteLike = async (req, res) => {
    const like = await LikeModel.findById(req.params.id);

    if(!like){
        res.status(400).json({content: "Ce like n'existe pas"});
    }

    await like.deleteOne();

    await decrementLikes(req.params.id);
    
    res.status(200).json("like supprimé: " + req.params.id);
}
