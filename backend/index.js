const express = require("express");
const cors = require("cors");
const {Pool} = require("pg");
const {ingreso_post, datos_ingresados, like, deletePost} = require("./info");

const app = express()

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})
app.use(express.json());
app.use(cors());


app.get("/posts", async (req, res) => {
    try {
        const posts = await datos_ingresados();
        res.json(posts);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
       
        
            const posts = await ingreso_post(titulo, url, descripcion);
        
        res.json("posts agregado");
    } catch (error) {
        console.log(error.message);
    }
});

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { likes } = req.query
        const posts = await like(id, likes);
        res.json(posts);
    } catch (error) {
        console.log(error.message);
    }
})

app.delete( "/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        const posts = await deletePost(id);
        res.json(posts);
        res.send("Post eliminado");
    } catch (error) {
        console.log(error.message);
    }
})