
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    const cursos = await pool.query('SELECT inscritos FROM curso ORDER BY inscritos DESC');
    console.log(cursos);
    //res.redirect('index'); //redirige a index pero esta vacio
    res.send(cursos); //muestra la consulta en la pagina
});


router.get('/cursos', async (req,res)=>{
    const repetidos= await pool.query('SELECT curso.id_curso, curso.nombre as nombreCurso, curso.imagen, curso.inscritos, curso.created_at, etiqueta.nombre as nombreEtiqueta, usuario.nombres as nomT, usuario.apellidos as apellT FROM curso, curso_has_etiqueta, etiqueta, tutor, usuario WHERE curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and curso.tutor_id_tutor = tutor.id_tutor and usuario.id_usuario = tutor.usuario_id_usuario ORDER BY inscritos desc,created_at desc');
    res.send(repetidos);
});


router.get('/etiqueta/:palabra', async (req,res)=>{
    const { palabra } = req.params;
    const cursoEti = await pool.query('SELECT curso.nombre,curso.imagen,curso.inscritos,curso.descripcion,curso.requisitos,curso.duracion,curso.fechaCreacion FROM etiqueta as E join curso Join curso_has_etiqueta  where id_curso = curso_id_curso and id_etiqueta=etiqueta_id_etiqueta and E.nombre  ?',[palabra], (err,rows,fields) => {
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
    const cursos = await pool.query('SELECT modulo.nombre FROM modulo Join curso WHERE id_curso = curso_id_curso and id_curso= ?', [id], (err,rows,fields) => {
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
    const cursos = await pool.query('SELECT E.nombre FROM etiqueta as E Join curso  Join curso_has_etiqueta WHERE id_curso = curso_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and id_curso= ?', [id], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos); //muestra la consulta en la pagina
});

router.get('/cursosEst/:idEst', async (req, res) => {
    const { idEst } = req.params;
    const cursos = await pool.query('SELECT curso.id_curso, curso.nombre as nombreCurso , curso.imagen, curso.litle_descripcion, curso.created_at, ustutor.nombres as tutorNombre, ustutor.apellidos as tutorApellido, usest.nombres as estNombre, usest.apellidos as estApellido, etiqueta.nombre as nombreEtiqueta FROM curso, tutor, usuario as ustutor, usuario as usest, usuario_has_curso, curso_has_etiqueta, etiqueta WHERE curso.TUTOR_id_tutor=tutor.id_tutor and ustutor.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso=usuario_has_curso.CURSO_id_curso and usuario_has_curso.USUARIO_id_usuario = usest.id_usuario  and curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and usest.id_usuario = ? ORDER BY curso.nombre asc', [idEst], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos);
});

router.get('/cursosEstFech/:idEst', async (req, res) => {
    const { idEst } = req.params;
    const cursos = await pool.query('SELECT curso.id_curso, curso.nombre as nombreCurso , curso.imagen, curso.litle_descripcion, curso.created_at, ustutor.nombres as tutorNombre, ustutor.apellidos as tutorApellido, usest.nombres as estNombre, usest.apellidos as estApellido, etiqueta.nombre as nombreEtiqueta FROM curso, tutor, usuario as ustutor, usuario as usest, usuario_has_curso, curso_has_etiqueta, etiqueta WHERE curso.TUTOR_id_tutor=tutor.id_tutor and ustutor.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso=usuario_has_curso.CURSO_id_curso and usuario_has_curso.USUARIO_id_usuario = usest.id_usuario and curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and usest.id_usuario = ? ORDER BY curso.created_at desc', [idEst], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(cursos);
    res.send(cursos);
});

module.exports = router;