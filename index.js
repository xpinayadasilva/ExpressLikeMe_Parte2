import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleErrors } from './lib/errors/handleErrors.js'
import { agregarPost, consultarPost, consultarPostId, modificarPost,eliminarPost } from './models/consultas.js'; 

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor levantado en http://localhost:" + PORT);
});

//RUTA GET
app.get('/posts', async (req, res) => {
  try {
    const data = await consultarPost();
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

// PUT
app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.query;
    const result = await modificarPost(likes, id);

    return res.status(200).json({ success: true, message: 'Post modificado correctamente', result });

  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message + ' : ' + error.column });
  }
});

// DELETE
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await eliminarPost(id);

    return res.status(200).json({ success: true, message: 'Post eliminado correctamente', id: result });

  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

// GET Mensaje para rutas no incluidas
app.use('*', (req, res) => {
  res.json({ ok: false, result: '404 Pagina no Encontrada' });
});