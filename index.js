import express from 'express';
import cors from 'cors';
import { handleErrors } from './controllers/handleErrors.js';
import { agregarPost, consultarPosts } from './controllers/consultas.js'; 

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor levantado en http://localhost:" + PORT);
});

//RUTA GET
app.get('/posts', async (req, res) => {
  try {
    const data = await consultarPosts();
    return res.status(200).json({ ok: true, message: 'Posts registrados: ', data });
    } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

//RUTA POST
 app.post('/posts', async (req, res) => {
  const post = {
    titulo: req.body.titulo,
    img: req.body.img,
    descripcion: req.body.descripcion,
    likes: req.body.likes
  } 
  try {
    const result = await agregarPost(post);
    return res.status(201).json({ ok: true, message: 'Post agregado', result });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});  

// GET Mensaje para rutas no incluidas
/* app.use('*', (req, res) => {
  res.json({ ok: false, result: '404 Pagina no Encontrada' });
}); */