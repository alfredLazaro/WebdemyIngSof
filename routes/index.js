
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    const cursos = await pool.query('SELECT inscritos FROM curso order by inscritos desc');
    console.log(cursos);
    //res.redirect('index'); //redirige a index pero esta vacio
    res.send(cursos); //muestra la consulta en la pagina
});

router.get('/curso', async (req,res)=>{
    const repetidos= await pool.query('select * from curso order by inscritos desc,fechaCreacion desc');
    res.send(repetidos);
});

router.get('/cursos', async (req,res)=>{
    const repetidos= await pool.query('SELECT curso.id_curso, curso.nombre as nombreCurso, curso.imagen, curso.inscritos, curso.fechaCreacion, etiqueta.nombre as nombreEtiqueta  FROM curso Join curso_has_etiqueta Join etiqueta WHERE curso.id_curso = curso_has_etiqueta.CURSO_id_curso and curso_has_etiqueta.ETIQUETA_id_etiqueta = etiqueta.id_etiqueta ORDER BY inscritos desc,fechaCreacion desc');
    res.send(repetidos);
});

router.get('/cursoU',async (req,res)=>{
    //const idCurso= //parte del frontend obtenerlo
    const cursoUnico = await pool.query('SELECT * FROM Modulo join curso where id_curso=Curso_id_curso and id_curso = ?',5113);
    res.send(cursoUnico);
});

router.get('/etiqueta', async (req,res)=>{
    //const etiq=
    const cursoEti = await pool.query('SELECT curso.nombre,curso.imagen,curso.inscritos,curso.descripcion,curso.requisitos,curso.duracion,curso.fechaCreacion FROM Etiqueta as E join curso Join curso_has_etiqueta  where id_curso = CURSO_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and E.nombre= ?', 'python');
    res.send(cursoEti);
});
router.get('/etiqueta/:palabra', async (req,res)=>{
    const { palabra } = req.params;
    const cursoEti = await pool.query('SELECT curso.nombre,curso.imagen,curso.inscritos,curso.descripcion,curso.requisitos,curso.duracion,curso.fechaCreacion FROM Etiqueta as E join curso Join curso_has_etiqueta  where id_curso = CURSO_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and E.nombre  ?',[palabra], (err,rows,fields) => {
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
    const cursos = await pool.query('SELECT * FROM curso WHERE id_curso = ?', [id], (err,rows,fields) => {
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
    const cursos = await pool.query('SELECT Modulo.nombre FROM Modulo Join curso WHERE id_curso = CURSO_id_curso and id_curso= ?', [id], (err,rows,fields) => {
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
    const cursos = await pool.query('SELECT E.nombre FROM etiqueta as E Join curso Join curso_has_etiqueta WHERE id_curso = CURSO_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and id_curso= ?', [id], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos); //muestra la consulta en la pagina
});

module.exports = router;