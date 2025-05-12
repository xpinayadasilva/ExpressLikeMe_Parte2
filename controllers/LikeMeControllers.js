import { consultarPost,consultarPostId,agregarPost,modificarPost,eliminarPost } from "../models/consultas.js";
import { getDatabaseError } from "../lib/errors/database/database.error.js";

const getAllPosts=()=>async (req, res) => {
    try {
      const data = await consultarPost();
      return res.status(200).json({ ok: true, message: 'Posts registrados: ', data });
      } catch (error) {
      const { status, message } = handleErrors(error.code);
      console.log(error);
      return res.status(status).json({ ok: false, result: message });
    }
};

const getByIdPosts=()=>async (req, res) => {
  const id = req.params.id;
  try {
    const data = await consultarPostId(id);
    if (!data) {
      res.status(404).json({ok: false, message: "Post no encontrado" });
    }
    res.json(todo);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false,message: "Internal server error" });
    }
 };    

const createPost=()=>async (req, res) => {
    const post = {
      titulo: req.body.titulo,
      img: req.body.img,
      descripcion: req.body.descripcion,
      likes: req.body.likes
    }     
    try {
      if (!post) {
        return res.status(400).json({ok: false,message: "El post esta vacio" });        
      }      
      const result = await agregarPost(post);
      return res.json(result);
      //return res.status(201).json({ok: true,message: 'Post agregado', result });
    } catch (error) {
      if (error.code) {
        const { code, message } = getDatabaseError(error.code);
        return res.status(code).json({ message });
      }  
      return res.status(code).json({result: message });
    }
  }

const updatePost=()=>async (req, res) => {
  const id = req.params.id; 
  try {        
    const result = await modificarPost(id);
    if (!result) {
      return res.status(404).json({ message: "El post no fue encontrado" });
      }
      return res.json(todo);    
    
  } catch (error) {
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }  
    console.log(error);
    return res.status(code).json({result: message });
  }
}

const removePost=()=>async (req, res) => {
  const id = req.params.id; 
  try {        
    const result = await eliminarPost(id);
    if (!result) {
      return res.status(404).json({ message: "El post no fue encontrado" });
      }      
      return res.json({ message: "Post eliminado" });
  } catch (error) {    
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }      
    return res.status(500).json({ message: "Internal server error" });
  }
}
//module.exports= {getAllPosts,getByIdPosts,createPost,updatePost};
export const ControladorLikeMe = {
  getAllPosts,
  getByIdPosts,
  createPost,
  updatePost,
  removePost,
  };

  