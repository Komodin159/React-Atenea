import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ['usuario', 'admin'],
      default: 'usuario',
    },
    // Nuevos campos para estructura de ingeniería/empresarial
    empresa: {
      type: String,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    rol_empresa: {
      type: String,
      enum: ['propietario', 'gerente', 'analista', 'desarrollador', 'disenador'],
      default: 'usuario',
    },
    fecha_alta: {
      type: Date,
      default: Date.now,
    },
    // Para estructura de cliente empresarial
    nit: {
      type: String,
      trim: true,
      unique: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
export default Cliente;