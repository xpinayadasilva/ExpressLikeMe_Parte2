import {pool} from '../conexion/db.js'

const consultarPost = async () => {
  const consulta = "SELECT * FROM posts";  
    const result = await pool.query(consulta, "");
    if (result.rowCount === 0) {
      throw { code: "404" };
    }
  return result.rows[0];
  };

const consultarPostId = async (id) => {
  const consulta = "SELECT * FROM posts WHERE id = $1";
  const values = [id];
    const result = await pool.query(consulta, values);
    if (result.rowCount === 0) {
      throw { code: "404" };
    }
  return result.rows[0];
  };
  
  const agregarPost = async (tituloPost, imgPost, descripcionPost, LikePost )=> {
     const values=[tituloPost, imgPost, descripcionPost,LikePost];
    if (!tituloPost?.trim() || !imgPost?.trim() || !descripcionPost?.trim()) {
      throw { code: '400' } };  
    const consulta = "INSERT INTO posts (id, titulo, img, descripcion, likes) values (DEFAULT, $1, $2, $3, $4) RETURNING *";    
    const result = await pool.query(consulta, values);    
    return result.rows[0];    
  };

  const modificarPost = async (likes, id) => {

    // Si lo hiciera solo con el id seria asi:
    // cont consulta = 'UPDATE post SET likes = likes + 1 WHERE id = $1';
    // const values =[id];
  
    const consulta = 'UPDATE posts SET likes = $1 WHERE id = $2';
    const values = [likes, id];
    const result = await pool.query(consulta, values);
  
    if (result.rowCount === 0) {
      throw { code: "404" };
    }    
    return {id, likes};
  };
  
  const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
  
    if (result.rowCount === 0) {
      throw { code: "404" };
    }  
    return {id};
  };
  
  export { consultarPost, consultarPostId, agregarPost, modificarPost, eliminarPost };

//prueba de consultas.js
//consultarPost();
//consultarPostId(1);
//agregarPost('Post nro 3','https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png','Noticia 3',50);
//modificarPost(80,1);
  
  
  