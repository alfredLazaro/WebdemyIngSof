
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    const cursos = await pool.query('SELECT inscritos FROM CURSO ORDER BY inscritos DESC');
    console.log(cursos);
    //res.redirect('index'); //redirige a index pero esta vacio
    res.send(cursos); //muestra la consulta en la pagina
});

router.get('/curso', async (req,res)=>{
    const repetidos= await pool.query('SELECT * FROM CURSO ORDER BY inscritos DESC,fechaCreacion DESC');
    res.send(repetidos);
});

router.get('/cursos', async (req,res)=>{
    const repetidos= await pool.query('SELECT CURSO.id_curso, CURSO.nombre as nombreCurso, CURSO.imagen, CURSO.inscritos, CURSO.created_at, ETIQUETA.nombre as nombreEtiqueta, USUARIO.nombres as nomT, USUARIO.apellidos as apellT FROM CURSO, CURSO_has_ETIQUETA, ETIQUETA, TUTOR, USUARIO WHERE CURSO.id_CURSO = CURSO_has_ETIQUETA.CURSO_id_CURSO and CURSO_has_ETIQUETA.ETIQUETA_id_etiqueta = ETIQUETA.id_etiqueta and CURSO.TUTOR_id_tutor = TUTOR.id_tutor and USUARIO.id_usuario = TUTOR.USUARIO_id_usuario ORDER BY inscritos desc,created_at desc');
    res.send(repetidos);
});

router.get('/cursoU',async (req,res)=>{
    //const idCurso= //parte del frontend obtenerlo
    const cursoUnico = await pool.query('SELECT * FROM Modulo join CURSO where id_curso=CURSO_id_curso and id_curso = ?',5113);
    res.send(cursoUnico);
});

router.get('/etiqueta', async (req,res)=>{
    //const etiq=
    const cursoEti = await pool.query('SELECT CURSO.nombre,CURSO.imagen,CURSO.inscritos,CURSO.descripcion,CURSO.requisitos,CURSO.duracion,CURSO.fechaCreacion FROM Etiqueta as E join CURSO Join   where id_curso = CURSO_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and E.nombre= ?', 'python');
    res.send(cursoEti);CURSO_has_etiqueta
});
router.get('/etiqueta/:palabra', async (req,res)=>{
    const { palabra } = req.params;
    const cursoEti = await pool.query('SELECT CURSO.nombre,CURSO.imagen,CURSO.inscritos,CURSO.descripcion,CURSO.requisitos,CURSO.duracion,CURSO.fechaCreacion FROM ETIQUETA as E join CURSO Join CURSO_has_ETIQUETA  where id_curso = CURSO_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and E.nombre  ?',[palabra], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    res.send(cursoEti);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cursos = await pool.query('SELECT curso.nombre , curso.imagen, curso.inscritos, curso.descripcion, curso.requisitos, curso.duracion, curso.created_at, tutor.bibliografia, usuario.nombres, usuario.apellidos FROM curso, tutor, usuario WHERE curso.TUTOR_id_tutor=tutor.id_tutor and usuario.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso = ?', [id], (err,rows,fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos); //muestra la consulta en la pagina
});


router.get('/:id/modulos', async (req, res) => {
    const { id } = req.params;
    const cursos = await pool.query('SELECT Modulo.nombre FROM Modulo Join CURSO WHERE id_curso = CURSO_id_curso and id_curso= ?', [id], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos); //muestra la consulta en la pagina
});

router.get('/:id/etiquetas', async (req, res) => {
    const { id } = req.params;
    const cursos = await pool.query('SELECT E.nombre FROM ETIQUETA as E Join CURSO  Join CURSO_has_ETIQUETA WHERE id_curso = CURSO_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and id_curso= ?', [id], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos); //muestra la consulta en la pagina
});

router.get('/:correo/USUARIO', async (req,res)=>{
    const {correo} = req.params;
    const repetidos= await pool.query(`SELECT U.correo FROM USUARIO as U WHERE U.correo =?`, [correo], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    res.send(repetidos);
});

router.get('/:correo/USUARIOID', async (req,res)=>{
    const {correo} = req.params;
    const repetidos= await pool.query(`SELECT id_usuario FROM USUARIO as U WHERE U.correo =?`, [correo], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    res.send(repetidos);
});
//var nos="INSERT INTO USUARIO (nombres,apellidos,correo,contrasena) VALUES("NOSE","nose112","nose@gmail.com","nosepues");"

router.post('/:datos/USUARIO', (req, res) => {
    const {nombre, apellidos, correo,contrasenia} = req.body ;
    console.log(nombre, apellidos, correo,contrasenia);
    const query = `
     INSERT INTRO USUARIO ( nombres,apellidos,correo,contrasena) VALUES ("javier","filigrana","filigrana@gmail.com","nose12343jaja");`;
    mysqlConnection.query(query,(err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  
  });

module.exports = router;