
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

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
/**Consultas para pag registtro */
router.get('/:correo/usuario', async (req,res)=>{
    const {correo} = req.params;
    const repetidos= await pool.query(`SELECT U.correo FROM usuario as U WHERE U.correo =?`, [correo], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    res.send(repetidos);
});

router.get('/:correo/usuarioid', async (req,res)=>{
    const {correo} = req.params;
    const repetidos= await pool.query(`SELECT id_usuario FROM usuario as U WHERE U.correo =?`, [correo], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log(repetidos);
    res.send(repetidos);
});
  
router.post('/register', async(req, res) => {
    console.log("entra al post");
    const {first,last , email, password} = req.body;
    console.log(req.body);
    /* let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(password, salt); */    
    const curso = await pool.query(`insert into usuario (nombres, apellidos, correo, contrasena) values (?, ?, ?, ?)`, [first,last,email,password],(err, rows, fields) => {
          
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    console.log("sale del post");
});
/**Fin consultas para pag registtro */

router.post('/login',async (req,res)=>{
    //los datos que se cargan en postman 
    const user = req.body.user;
    const password = req.body.password;
    //consulta para obtener el email
    const passwordHash=await bcrypt.hash(password,8);
    const email= await pool.query(`SELECT * FROM usuario where correo= ?`,user); 
    //comprobamos que sean datos 
    
    if(user == email[0].correo && (await bcrypt.compare(password,email[0].contrasena))){
        //let passwordHash = await bcrypt.hash(password,8);
        res.json({
            message: '¡AUTENTICADO WEY!',
            passwordHash: passwordHash
        });
    }else{
        res.json({
            message: '¡error!',
            email : email[0],
            passwordHash: passwordHash
        });
    }
})

module.exports = router;