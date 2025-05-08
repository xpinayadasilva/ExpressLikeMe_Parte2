import {pool} from '../conexion/db.js'

export const consultarPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts');
    console.log(rows);
    return rows;
  };
  
  export const agregarPost = async (tituloPost, imgPost, descripcionPost, LikePost )=> {
     const values=[tituloPost, imgPost, descripcionPost,LikePost];
    if (!tituloPost?.trim() || !imgPost?.trim() || !descripcionPost?.trim()) {
      throw { code: '400' } };  
    const result = await pool.query(
      "INSERT INTO posts (id, titulo, img, descripcion, likes) values (DEFAULT, $1, $2, $3, $4);"
      , values 
    );    
    return result.rows[0]; 
  };
  
//prueba
//consultarPosts();
  
  
  