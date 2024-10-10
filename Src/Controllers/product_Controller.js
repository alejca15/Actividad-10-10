const fs = require("fs").promises;

//--------------------------Get-------------------------//

const getAllInventory = async (req, res) => {
  try {
    const data = await fs.readFile("./Server/Database.JSON", "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fail to fetch inventory", error });
  }
};

const postProduct = async (req, res) => {
  const { Nombre, Presentacion, Cantidad } = req.body;
  try {
    const data = await fs.readFile("./Server/Database.JSON", "utf8");
    const inventory = JSON.parse(data);
    const newProducto = {
      id: inventory.Inventario.length + 1,
      Nombre,
      Presentacion,
      Cantidad,
    };
    inventory.Inventario.push(newProducto);
    await fs.writeFile("./Server/Database.JSON", JSON.stringify(inventory, null, 2), "utf8");
    console.log("El archivo ha sido actualizado con éxito");
  } catch (error) {
    console.error("Error al procesar la solicitud", error);
    res.status(500).json({ message: "Fail to add Producto", error });
  }
};


//--------------------------Delete-------------------------//

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile("./Server/Database.JSON", "utf8");
    const inventory = JSON.parse(data);
    const ProductoIndex = inventory.Inventario.findIndex(
      (Producto) => Producto.id === parseInt(id)
    );
    if (ProductoIndex === -1) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    inventory.Inventario.splice(ProductoIndex, 1);
    await fs.writeFile("./Server/Database.JSON", JSON.stringify(inventory, null, 2), "utf8");
    console.log("Producto eliminado exitosamente.");
  } catch (error) {
    console.error("Error al eliminar el Producto:", error);
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};


//--------------------------Update-------------------------//

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Presentacion, Cantidad } = req.body;
  try {
    const data = await fs.readFile("./Server/Database.JSON", "utf8");
    const inventory = JSON.parse(data);
    const ProductoIndex = inventory.Inventario.findIndex(
      (Producto) => Producto.id === parseInt(id)
    );

    if (ProductoIndex === -1) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    if (Nombre) {
      inventory.Inventario[ProductoIndex].Nombre = Nombre;
    }

    if (Presentacion) {
      inventory.Inventario[ProductoIndex].Presentacion = Presentacion;
    }

    if (Cantidad) {
      inventory.Inventario[ProductoIndex].Cantidad = Cantidad;
    }
    await fs.writeFile("./Server/Database.JSON", JSON.stringify(inventory, null, 2), "utf8");
    console.log("Producto actualizado exitosamente.");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

module.exports = {
  getAllInventory,
  postProduct,
  deleteProducto,
  updateProducto
};
