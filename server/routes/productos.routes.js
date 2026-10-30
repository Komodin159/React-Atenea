import { Router } from 'express';
import mongoose from 'mongoose';
import Producto from '../models/Producto.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = Router();

router.use(verificarToken);

router.get('/', async (_req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });
    return res.json(productos);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudieron obtener los productos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nombre = String(req.body.nombre || '').trim();
    const precio = Number(req.body.precio);

    if (!nombre || !Number.isFinite(precio) || precio < 0) {
      return res.status(400).json({ mensaje: 'Nombre y precio valido son obligatorios' });
    }

    const producto = await Producto.create({ nombre, precio });
    return res.status(201).json(producto);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo crear el producto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El id del producto no es valido' });
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
