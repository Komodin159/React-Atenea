import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    // Campos adicionales de ingeniería/empresarial
    categoria: {
      type: String,
      required: true,
      trim: true,
      default: 'general',
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    descripcion: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
export default Producto;