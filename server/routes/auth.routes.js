import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
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
  };
}

router.post('/registro', async (req, res) => {
  try {
    const nombre = String(req.body.nombre || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!nombre || !email || password.length < 6) {
      return res.status(400).json({
        mensaje: 'Nombre, correo y una contrasena de al menos 6 caracteres son obligatorios',
      });
    }

    const existente = await Usuario.findOne({ email });

    if (existente) {
      return res.status(400).json({ mensaje: 'El correo ya esta registrado' });
    }

    const passwordCifrado = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordCifrado,
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      token: crearToken(usuario),
      usuario: usuarioSeguro(usuario),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ mensaje: 'El correo ya esta registrado' });
    }

    return res.status(500).json({ mensaje: 'No se pudo registrar el usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Correo y contrasena son obligatorios' });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contrasena incorrectos' });
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: 'Correo o contrasena incorrectos' });
    }

    return res.json({
      token: crearToken(usuario),
      usuario: usuarioSeguro(usuario),
    });
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo iniciar sesion' });
  }
});

router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.json(usuario);
  } catch {
    return res.status(500).json({ mensaje: 'No se pudo obtener el perfil' });
  }
});

export default router;
