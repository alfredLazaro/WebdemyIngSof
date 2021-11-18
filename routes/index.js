
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

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

//andre estuvo aqui

router.post('/registrar', async (req,res)=> {
    const { nombre,apellido,fecha_nacimiento,correo, pass} = req.body;

    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(pass,salt);
    var cumple= true;

    if(pass.length<=5)
    {
        res.json("muy corto");
        cumple=false;
    }
    if(nombre==pass)
    {
        res.json("el nombre y la clave no pueden ser iguales");
        cumple=false;
    }
    if(cumple)
    {
        const cursos = await pool.query(`INSERT INTO usuario (nombres, apellidos, fecha_nacimiento, correo, contrasena, fotografia) VALUES ('${nombre}', '${apellido}', '${fecha_nacimiento}', '${correo}', '${hash}', 'ss')`,(err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }
})

module.exports = router;