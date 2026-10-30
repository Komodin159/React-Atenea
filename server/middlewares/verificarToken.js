import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export function verificarToken(req, res, next) {
  const autorizacion = req.headers.authorization || '';

  if (!autorizacion.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Debes iniciar sesion para continuar' });
  }

  const token = autorizacion.slice(7);

  try {
    const datos = jwt.verify(token, JWT_SECRET);
    req.usuario = datos;
    return next();
  } catch {
    return res.status(401).json({ mensaje: 'Token invalido o expirado' });
  }
}
