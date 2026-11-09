import { Router } from 'express';
import mongoose from 'mongoose';
import Cliente, {
  ESTADOS_CLIENTE,
  TIPOS_CLIENTE,
} from '../models/Cliente.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = Router();

router.use(verificarToken);

function normalizar(datos) {
  return {
    nombre: String(datos.nombre || '').trim(),
    empresa: String(datos.empresa || '').trim(),
    nit: String(datos.nit || '').trim(),
    email: String(datos.email || '').trim().toLowerCase(),
    telefono: String(datos.telefono || '').trim(),
    direccion: String(datos.direccion || '').trim(),
    ciudad: String(datos.ciudad || '').trim(),
    tipo: TIPOS_CLIENTE.includes(datos.tipo) ? datos.tipo : 'Persona natural',
    estado: ESTADOS_CLIENTE.includes(datos.estado) ? datos.estado : 'Activo',
    notas: String(datos.notas || '').trim(),
    avatar: String(datos.avatar || '').trim(),
  };
}

router.get('/', async (_req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    return res.json(clientes);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudieron obtener los clientes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El id del cliente no es válido' });
    }

    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    return res.json(cliente);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo obtener el cliente' });
  }
});

router.post('/', async (req, res) => {
  try {
    const datos = normalizar(req.body);

    if (!datos.nombre || !datos.email) {
      return res
        .status(400)
        .json({ mensaje: 'El nombre y el correo son obligatorios' });
    }

    const cliente = await Cliente.create(datos);
    return res.status(201).json(cliente);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un cliente con ese dato único' });
    }

    return res.status(500).json({ mensaje: 'No se pudo crear el cliente' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El id del cliente no es válido' });
    }

    const cambios = {};

    if (ESTADOS_CLIENTE.includes(req.body.estado)) {
      cambios.estado = req.body.estado;
    }

    if (TIPOS_CLIENTE.includes(req.body.tipo)) {
      cambios.tipo = req.body.tipo;
    }

    if (typeof req.body.notas === 'string') {
      cambios.notas = req.body.notas.trim();
    }

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ mensaje: 'No hay campos válidos para actualizar' });
    }

    const cliente = await Cliente.findByIdAndUpdate(req.params.id, cambios, {
      new: true,
      runValidators: true,
    });

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    return res.json(cliente);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo actualizar el cliente' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El id del cliente no es válido' });
    }

    const cliente = await Cliente.findByIdAndDelete(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    return res.json({ mensaje: 'Cliente eliminado', id: cliente._id });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo eliminar el cliente' });
  }
});

export default router;
