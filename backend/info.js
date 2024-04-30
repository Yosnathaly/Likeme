
const {Pool} = require ("pg");

const pool = new Pool({
    host: "localhost",
    user: "admin",
    password: "admin123",
    database: "likeme",
    allowExitOnIdle: true
})

const datos_ingresados = async () => {
    
    const query = "SELECT * FROM posts;"
    const {rows} = await pool.query(query);
    return rows
 
}

const ingreso_post = async (titulo, url, descripcion) => {
    const id = Math.floor(Math.random() * 9999);
    const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1, $2, $3, $4, $5) RETURNING *;";
    const values = [id, titulo, url, descripcion, 0];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Devuelve el nuevo post agregado
};
module.exports = {datos_ingresados,ingreso_post}