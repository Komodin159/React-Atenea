import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cliente from '../models/Usuario.js';
import { JWT_SECRET } from '../config.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = Router();

function crearToken(usuario) {
  return jwt.sign({ id: usuario._id.toString(), rol: usuario.rol }, JWT_SECRET, {
    expiresIn: '1d',
  });
}

function usuarioSeguro(usuario) {
  return {
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    empresa: usuario.empresa,
    rol_empresa: usuario.rol_empresa,
  };
}

router.post('/registro', async (req, res) => {
  try {
    const nombre = String(req.body.nombre || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!nombre || !email || password.length < 6) {
      return res.status(400).json({
        mensaje: 'Nombre, correo y una contraseña de al menos 6 caracteres son obligatorios',
      });
    }

    const existente = await Cliente.findOne({ email });

    if (existente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordCifrado = await bcrypt.hash(password, salt);

    const cliente = await Cliente.create({
      nombre,
      email,
      password: passwordCifrado,
      // Campos opcionales del formulario
      empresa: req.body.empresa || '',
      telefono: req.body.telefono || '',
      direccion: req.body.direccion || '',
      rol_empresa: req.body.rol_empresa || 'usuario',
      nit: req.body.nit || '',
    });

    return res.status(201).json({
      mensaje: 'Cliente registrado correctamente',
      token: crearToken(cliente),
      usuario: usuarioSeguro(cliente),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    return res.status(500).json({ mensaje: 'No se pudo registrar el cliente' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
    }

    const cliente = await Cliente.findOne({ email });

    if (!cliente) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const passwordCorrecto = await bcrypt.compare(password, cliente.password);

    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    return res.json({
      token: crearToken(cliente),
      usuario: usuarioSeguro(cliente),
    });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo iniciar sesión' });
  }
});

router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.usuario.id).select('-password');

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    return res.json(cliente);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo obtener el perfil' });
  }
});

export default router;