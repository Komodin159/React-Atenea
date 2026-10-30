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
  },
  { timestamps: true },
);

const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);

export default Producto;
