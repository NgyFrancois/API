import express from "express";

import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import likeRoute from "./routes/like.js";
import connectDB from "./database/db.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

// Route par défaut
app.get("/", (req, res) => {
  res.send("Le serveur est bien démarré.");
});

// Utilisation des routes
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/like", likeRoute);


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
