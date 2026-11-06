# Atenea Café · Panel de gestión

Aplicación web para administrar una cafetería: autenticación JWT, inventario de productos, base de clientes y favoritos. El frontend está hecho con React + Vite y el backend con Express + MongoDB Atlas.

## Tecnologías

- React 19 + Vite
- React Router
- Axios
- Express 5
- MongoDB Atlas + Mongoose
- JWT + bcryptjs
- Vitest + Testing Library

## Funcionalidades

- Registro e inicio de sesión con contraseña cifrada.
- Rutas privadas protegidas mediante token JWT.
- Panel general con métricas reales del inventario (productos, stock bajo, valor y categorías).
- CRUD de productos: listar, crear, filtrar por categoría y eliminar.
- Módulo de clientes: listar, buscar, filtrar por tipo, crear, ver ficha, actualizar estado/tipo/notas y eliminar.
- Persistencia de favoritos en `localStorage`.
- Validación de sesión al recargar la página.
- Datos de demostración de cafetería mediante `npm run seed`.

## Requisitos

- Node.js y npm instalados.
- Una base de datos MongoDB Atlas.
- El backend y el frontend se ejecutan en terminales separadas.

## Configuración

1. Instalar dependencias del frontend:

```bash
npm install
```

2. Instalar dependencias del backend:

```bash
cd server
npm install
```

3. Crear el archivo `.env` en la raíz (o en `server/`) a partir de `.env.example`:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/atenea?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=una_clave_larga_y_aleatoria
DNS_SERVERS=8.8.8.8,1.1.1.1
```

`DNS_SERVERS` es opcional. Ayuda cuando el DNS local falla al resolver MongoDB Atlas.

> Importante: en MongoDB Atlas, agrega tu IP pública en **Network Access**. Si no lo haces, la conexión falla con un error TLS/whitelist.

4. Poblar la base de datos con los datos de demostración:

```bash
cd server
npm run seed
```

El seed crea el usuario demo **admin@atenea.com / admin123**, 8 clientes y 18 productos de cafetería.

## Ejecución

Terminal 1, backend:

```bash
cd server
npm run dev
```

Terminal 2, frontend:

```bash
npm run dev
```

Abrir `http://localhost:5173` e iniciar sesión con `admin@atenea.com` / `admin123` (o registrar una cuenta nueva).

## Comandos

Frontend, desde la raíz:

```bash
npm run dev       # servidor de desarrollo
npm run build     # compilación de producción
npm run lint      # revisión de ESLint
npm test          # pruebas unitarias
```

Backend, desde `server/`:

```bash
npm run dev       # servidor con nodemon
npm start         # servidor normal
npm run seed      # cargar datos de demostración
npm run probar    # probar conexión a MongoDB
```

## API

| Método | Ruta | Descripción | Protegida |
| --- | --- | --- | --- |
| GET | `/api/health` | Estado del servidor y MongoDB | No |
| POST | `/api/auth/registro` | Crear usuario y devolver token | No |
| POST | `/api/auth/login` | Iniciar sesión y devolver token | No |
| GET | `/api/auth/perfil` | Datos del usuario autenticado | Sí |
| GET | `/api/productos` | Listar productos | Sí |
| GET | `/api/productos/resumen` | Métricas del inventario | Sí |
| POST | `/api/productos` | Crear producto | Sí |
| DELETE | `/api/productos/:id` | Eliminar producto | Sí |
| GET | `/api/clientes` | Listar clientes | Sí |
| GET | `/api/clientes/:id` | Obtener un cliente | Sí |
| POST | `/api/clientes` | Crear cliente | Sí |
| PATCH | `/api/clientes/:id` | Actualizar estado, tipo o notas | Sí |
| DELETE | `/api/clientes/:id` | Eliminar cliente | Sí |

Las rutas protegidas esperan el encabezado:

```text
Authorization: Bearer <token>
```

## Estructura

```text
src/
  __tests__/        Pruebas unitarias
  api/              Cliente Axios e interceptor JWT
  components/       Componentes reutilizables
  context/          Sesión y favoritos
  layouts/          Layout del dashboard
  pages/            Login, registro, panel, productos, clientes y favoritos
server/
  middlewares/      Verificación del token
  models/           Modelos Usuario, Cliente y Producto
  routes/           Rutas de auth, productos y clientes
  config.js         Variables de entorno
  db.js             Conexión a MongoDB
  index.js          Servidor Express
  seed.js           Datos de demostración
```

## Flujo de demo

1. Abrir la aplicación sin sesión: redirige a `/login`.
2. Iniciar sesión con el usuario demo o crear una cuenta en `/registro`.
3. Revisar las métricas del panel general.
4. Crear un producto desde la página Productos.
5. Registrar un cliente y abrir su ficha para cambiar estado o notas.
6. Agregar un producto a favoritos y abrir Mis Favoritos.
7. Recargar la página y comprobar que la sesión y los favoritos siguen activos.
8. Cerrar sesión y confirmar la redirección a `/login`.
