import { Router } from 'express';
import mongoose from 'mongoose';
import Producto from '../models/Producto.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = Router();

router.use(verificarToken);

router.get('/resumen', async (_req, res) => {
  try {
    const productos = await Producto.find().lean();
    const total = productos.length;
    const stockBajo = productos.filter((producto) => producto.stock <= 5).length;
    const valorInventario = productos.reduce(
      (acumulado, producto) => acumulado + producto.precio * producto.stock,
      0,
    );
    const categorias = [...new Set(productos.map((producto) => producto.categoria))]
      .filter(Boolean)
      .sort();

    return res.json({ total, stockBajo, valorInventario, categorias });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo obtener el resumen' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });
    return res.json({ productos, total: productos.length });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudieron obtener los productos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nombre = String(req.body.nombre || '').trim();
    const precio = Number(req.body.precio);
    const categoria = String(req.body.categoria || 'General').trim();
    const stock = Number(req.body.stock ?? 0);
    const descripcion = String(req.body.descripcion || '').trim();

    if (!nombre || !Number.isFinite(precio) || precio < 0) {
      return res
        .status(400)
        .json({ mensaje: 'Nombre y precio válido son obligatorios' });
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return res
        .status(400)
        .json({ mensaje: 'El stock debe ser un número entero mayor o igual a cero' });
    }

    const producto = await Producto.create({
      nombre,
      precio,
      categoria,
      stock,
      descripcion,
    });

    return res.status(201).json(producto);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo crear el producto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El id del producto no es válido' });
    }

    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.json({ mensaje: 'Producto eliminado', id: producto._id });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo eliminar el producto' });
  }
});

export default router;
