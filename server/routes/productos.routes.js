import { Router } from 'express';
import mongoose from 'mongoose';
import Cliente from '../models/Usuario.js';
import Producto from '../models/Producto.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = Router();

// Middleware de verificación aplicado a todas las rutas
router.use(verificarToken);

router.get('/', async (req, res) => {
  try {
    const { limite = 50, offset = 0 } = req.query;
    const productos = await Producto.find()
      .sort({ nombre: 1 })
      .skip(Number(offset))
      .limit(Number(limite));
    const total = await Producto.countDocuments();
    return res.json({
      productos,
      total,
      pagina: Number(offset) / Number(limite) + 1,
      total_paginas: Math.ceil(total / Number(limite)),
    });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudieron obtener los productos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nombre = String(req.body.nombre || '').trim();
    const precio = Number(req.body.precio);
    const categoria = String(req.body.categoria || '').trim();
    const stock = Number(req.body.stock) || 0;
    const descripcion = String(req.body.descripcion || '').trim();

    if (!nombre || !Number.isFinite(precio) || precio < 0) {
      return res.status(400).json({ mensaje: 'Nombre y precio válido son obligatorios' });
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

// Nueva ruta: GET por categoría
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const { limite = 50 } = req.query;
    const productos = await Producto.find({ categoria: req.params.categoria })
      .sort({ nombre: 1 })
      .limit(Number(limite));
    return res.json(productos);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudieron obtener los productos por categoría' });
  }
});

export default router;