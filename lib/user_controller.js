import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    const posts = await UserModel.find();
    res.status(200).json(posts);
};

export const setUser = async (req, res) => {
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400).json({content : "Merci d'ajouter un username, email et un password"});
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(200).json(user);
    }
};

export const editUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if(!user){
        res.status(400).json({content: "Cette utilisateur n'existe pas"});
    }

    const isMatch = await bcrypt.compare(req.body.lastpassword, user.password);

    if(!isMatch){
        res.status(400).json({content: "L'ancien mot de passe ne correspond pas"})
    }

    if(req.body.newpassword){
        req.body.password = await bcrypt.hash(req.body.newpassword, 10);
    }

    const updateUser = await UserModel.findByIdAndUpdate(
        user,
        req.body,
        {new: true}
    );

    res.status(200).json(updateUser);
};

export const deleteUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if(!user){
        res.status(400).json({content: "Cette utilisateur n'existe pas"});
    }

    await user.deleteOne();
    
    res.status(200).json("Utilisateur supprimé: " + req.params.id);
};


export const findUserByUsername = async (username) => {
    try {
        if (!username) {
            throw new Error("Le username est requis");
        }

        console.log("Recherche de l'utilisateur avec username:", username); // test

        const user = await UserModel.findOne({ username });

        if (!user) {
            console.log("Aucun utilisateur trouvé avec ce username");
            return null;
        }

        return user;
    } catch (error) {
        console.error("Erreur dans findUserByUsername:", error.message);
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
};

