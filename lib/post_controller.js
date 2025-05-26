import PostModel from "../models/post_model.js";
import { findUserByUsername } from "../lib/user_controller.js";

export const getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts);
};

export const setPosts = async (req, res) => {
    if(!req.body.content || !req.body.author){ // author = username
        res.status(400).json({content : "Merci d'ajouter un contenu et un autheur"});
    } else {
        const user = await findUserByUsername(req.body.author)

        const post = await PostModel.create({
            author: user,
            content: req.body.content
        });
        res.status(200).json(post);

    }
};

export const editPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if(!post){
        res.status(400).json({content: "Ce post n'existe pas"});
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        post,
        req.body,
        {new: true}
    );

    res.status(200).json(updatePost);
};

export const deletePost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if(!post){
        res.status(400).json({content: "Ce post n'existe pas"});
    }

    await post.deleteOne();
    
    res.status(200).json("Message supprimé: " + req.params.id);
}

/*
export const likePost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {like: req.body.userId} },
            { new: true }
        ).then((data) => res.status(200).send(data));
    } catch(err) {
        res.status(200).json(err);
    }
}

export const dislikePost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {like: req.body.userId} },
            { new: true }
        ).then((data) => res.status(200).send(data));
    } catch(err) {
        res.status(200).json(err);
    }
}
*/

export const findPost = async (id) => {
    try {
        if (!id) {
            throw new Error("L'id est requis");
        }

        console.log("Recherche du post avec l'id:", id); // test

        const post = await PostModel.findById(id);

        if (!post) {
            console.log("Aucun post trouvé avec cette id");
            return null;
        }

        return post;
    } catch (error) {
        console.error("Erreur dans findPost:", error.message);
        throw new Error("Erreur lors de la récupération du post");
    }
};

export const incrementLikes = async (id) => {
    try {
        if (!id) {
            throw new Error("L'id est requis");
        }

        console.log("Recherche du post avec l'id:", id); // test
        await PostModel.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: false } // on ne récupère pas le document mis a jour
          );
      
          console.log("Like incrémenté pour le post:", id); // test
    } catch (error) {
      console.error("Erreur lors de l'incrément des likes :", error);
    }
};

export const decrementLikes = async (id) => {
    try {
        if (!id) {
            throw new Error("L'id est requis");
        }

        console.log("Recherche du post avec l'id:", id); // test
        await PostModel.findByIdAndUpdate(
            id,
            { $inc: { likes: -1 } },
            { new: false } // on ne récupère pas le document mis a jour
          );
      
          console.log("Like incrémenté pour le post:", id); // test
    } catch (error) {
      console.error("Erreur lors de l'incrément des likes :", error);
    }
};