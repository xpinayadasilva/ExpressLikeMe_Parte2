import pkg from "pg";
const { Pool } = pkg;

// Base de datos y tabla en PostgreSQL
// CREATE DATABASE likeme;
// CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),descripcion VARCHAR(255), likes INT);

export const pool = new Pool({
     host: 'localhost',
     user: 'postgres',
     password: '2808',
     database: 'likeme',
     port: 5432,
     allowExitOnIdle: true,
   });
try {
  await pool.query("SELECT NOW()");
  console.log("Database connected");
} catch (error) {
  console.log(error);
};
