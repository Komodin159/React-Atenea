# React Atenea

Dashboard con autenticacion JWT, inventario de productos en MongoDB y lista de favoritos persistida en el navegador.

## Tecnologias

- React 19 + Vite
- React Router
- Axios
- Express 5
- MongoDB Atlas + Mongoose
- JWT + bcryptjs
- Vitest + Testing Library

## Funcionalidades

- Registro e inicio de sesion con contrasena cifrada.
- Rutas privadas protegidas mediante token JWT.
- CRUD de productos: listar, crear y eliminar.
- Persistencia de favoritos en `localStorage`.
- Validacion de sesion al recargar la pagina.
- Pruebas unitarias de Login, RutaProtegida y ProductoCard.

## Requisitos

- Node.js y npm instalados.
- Una base de datos MongoDB Atlas.
- El backend y el frontend se ejecutan en terminales separadas.

## Configuracion

1. Instalar dependencias del frontend:

```bash
npm install
```

2. Instalar dependencias del backend:

```bash
cd server
npm install
```

3. Crear el archivo `.env` en la raiz a partir de `.env.example`:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/atenea?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=una_clave_larga_y_aleatoria
DNS_SERVERS=8.8.8.8,1.1.1.1
```

`DNS_SERVERS` es opcional. Ayuda cuando el DNS local falla al resolver MongoDB Atlas.

## Ejecucion

Terminal 1, backend:

```bash
cd server
npm run dev
```

Terminal 2, frontend:

```bash
npm run dev
```

Abrir `http://localhost:5173`, registrar un usuario y entrar al dashboard.

## Comandos

Frontend, desde la raiz:

```bash
npm run dev       # servidor de desarrollo
npm run build     # compilacion de produccion
npm run lint      # revision de ESLint
npm test          # pruebas unitarias
```

Backend, desde `server/`:

```bash
npm run dev       # servidor con nodemon
npm start         # servidor normal
npm run probar    # probar conexion a MongoDB
```

## API

| Metodo | Ruta | Descripcion | Protegida |
| --- | --- | --- | --- |
| GET | `/api/health` | Estado del servidor y MongoDB | No |
| POST | `/api/auth/registro` | Crear usuario y devolver token | No |
| POST | `/api/auth/login` | Iniciar sesion y devolver token | No |
| GET | `/api/auth/perfil` | Datos del usuario autenticado | Si |
| GET | `/api/productos` | Listar productos | Si |
| POST | `/api/productos` | Crear producto | Si |
| DELETE | `/api/productos/:id` | Eliminar producto | Si |

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
  context/          Sesion y favoritos
  layouts/          Layout del dashboard
  pages/            Login, registro, productos, usuarios y favoritos
server/
  middlewares/      Verificacion del token
  models/           Modelos Usuario y Producto
  routes/           Rutas de auth y productos
  config.js         Variables de entorno
  db.js             Conexion a MongoDB
  index.js          Servidor Express
```

## Flujo de demo

1. Abrir la aplicacion sin sesion: redirige a `/login`.
2. Entrar a `/registro` y crear una cuenta.
3. Verificar el acceso al panel protegido.
4. Crear un producto desde la pagina Productos.
5. Agregar el producto a favoritos y abrir Mis Favoritos.
6. Recargar la pagina y comprobar que la sesion y los favoritos siguen activos.
7. Cerrar sesion y confirmar la redireccion a `/login`.
