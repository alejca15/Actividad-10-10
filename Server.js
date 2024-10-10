const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const productsRoutes=require("./Src/Routes/products_Routes.js")

const PORT = process.env.PORT || 3000;

//Permite el post (BUSCAR)
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/inventario", productsRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });