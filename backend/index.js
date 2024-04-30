const express = require("express");
const cors = require("cors");
const {Pool} = require("pg");
const {ingreso_post, datos_ingresados} = require("./info");

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