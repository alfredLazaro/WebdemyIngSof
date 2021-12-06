/*
    para ingresar ala BD que esa en un hosting:para terminal, desconosco su uso en otros lados.

    mysql -h bnzejryfzccllt1iv6cd-mysql.services.clever-cloud.com -P 3306 -u uwniakdgootbcctr -p bnzejryfzccllt1iv6cd
    passsword:pl7TQyNVrNog321QJICH
*/

const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  const cursos = await pool.query(
    "SELECT inscritos FROM curso ORDER BY inscritos DESC"
  );
  console.log(cursos);
  //res.redirect('index'); //redirige a index pero esta vacio
  res.send(cursos); //muestra la consulta en la pagina
});

router.get("/cursos", async (req, res) => {
  const repetidos = await pool.query(
    "SELECT curso.id_curso, curso.nombre as nombreCurso, curso.imagen, curso.inscritos, curso.created_at, etiqueta.nombre as nombreEtiqueta, usuario.nombres as nomT, usuario.apellidos as apellT FROM curso, curso_has_etiqueta, etiqueta, tutor, usuario WHERE curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and curso.tutor_id_tutor = tutor.id_tutor and usuario.id_usuario = tutor.usuario_id_usuario ORDER BY inscritos desc,created_at desc"
  );
  res.send(repetidos);
});

router.get("/etiqueta/:palabra", async (req, res) => {
  const { palabra } = req.params;
  const cursoEti = await pool.query(
    "SELECT curso.nombre,curso.imagen,curso.inscritos,curso.descripcion,curso.requisitos,curso.duracion,curso.fechaCreacion FROM etiqueta as E join curso Join curso_has_etiqueta  where id_curso = curso_id_curso and id_etiqueta=etiqueta_id_etiqueta and E.nombre  ?",
    [palabra],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
  res.send(cursoEti);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cursos = await pool.query(
    "SELECT curso.nombre , curso.imagen, curso.inscritos, curso.descripcion, curso.requisitos, curso.duracion, curso.created_at, tutor.bibliografia, usuario.nombres, usuario.apellidos FROM curso, tutor, usuario WHERE curso.TUTOR_id_tutor=tutor.id_tutor and usuario.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );

  res.send(cursos); //muestra la consulta en la pagina
});

router.get("/:id/modulos", async (req, res) => {
  const { id } = req.params;
  const cursos = await pool.query(
    "SELECT modulo.nombre FROM modulo Join curso WHERE id_curso = curso_id_curso and id_curso= ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );

  res.send(cursos); //muestra la consulta en la pagina
});

router.get("/:id/etiquetas", async (req, res) => {
  const { id } = req.params;
  const cursos = await pool.query(
    "SELECT E.nombre FROM etiqueta as E Join curso  Join curso_has_etiqueta WHERE id_curso = curso_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and id_curso= ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );

  res.send(cursos); //muestra la consulta en la pagina
});
/**Consultas para pag registtro
 *
 */

router.get("/:correo/usuario", async (req, res) => {
  const { correo } = req.params;
  console.log(correo);
  const idConCorreo = await pool.query(
    `SELECT usuario.correo FROM usuario  WHERE usuario.correo = ? `,
    [correo],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );

  res.send(idConCorreo);
});

router.get("/:correo/usuarioid", async (req, res) => {
  const { correo } = req.params;
  console.log(correo);
  const repetidos = await pool.query(
    `SELECT usuario.id_usuario FROM usuario WHERE usuario.correo = ? `,
    [correo],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
  console.log(repetidos);
  res.send(repetidos);
});

router.post("/register", async (req, res) => {
  const { first, last, email, password } = req.body;
  console.log(req.body);
  /* let salt = bcrypt.genSaltSync();*/
  const hash = await bcrypt.hash(password, 8);
  const idUs = await pool.query(`SELECT * FROM usuario where correo=?`, email);
  if (idUs.length == 0) {
    const curso = await pool.query(
      `insert into usuario (nombres, apellidos, correo, contrasena) values (?, ?, ?, ?)`,
      [first, last, email, hash],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    console.log("ya hay cuenta con el gmail");
    res.json({
      mensaj: "incorrecto MAL",
    });
  }
  console.log("sale del post");
});
/**Fin consultas para pag registtro
 *
 */

router.get("/:email/login", async (req, res) => {
  //los datos que se cargan en postman
  const { email } = req.params;
  //const password = req.params;
  //consulta para obtener el email
  /* const passwordHash=await bcrypt.hash([password],8); */
  const emailR = await pool.query(
    `SELECT * FROM usuario where correo= ?`,
    email,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
        console.log(email);
        //console.log(emailR.correo);
        /* if(email == emailR[0].correo  && (await bcrypt.compare(password,email[0].contrasena)) ){
                //let passwordHash = await bcrypt.hash(password,8);
                res.json({
                    message: '¡AUTENTICADO WEY!',
                    
                });
            }else{
                res.json({
                    message: '¡error!',
                    emailR : email[0],
                   
                });
            }  */
      } else {
        console.log(err);
      }
    }
  );
  res.send(emailR);
  //comprobamos que sean datos
  /* 
    if(user == emailR[0].correo && (await bcrypt.compare(password,email[0].contrasena))){
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
    } */
});

router.get("/cursosEst/:idEst", async (req, res) => {
  const { idEst } = req.params;
  const cursos = await pool.query(
    "SELECT curso.id_curso, curso.nombre as nombreCurso , curso.imagen, curso.litle_descripcion, curso.created_at, ustutor.nombres as tutorNombre, ustutor.apellidos as tutorApellido, usest.nombres as estNombre, usest.apellidos as estApellido, etiqueta.nombre as nombreEtiqueta FROM curso, tutor, usuario as ustutor, usuario as usest, usuario_has_curso, curso_has_etiqueta, etiqueta WHERE curso.TUTOR_id_tutor=tutor.id_tutor and ustutor.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso=usuario_has_curso.CURSO_id_curso and usuario_has_curso.USUARIO_id_usuario = usest.id_usuario  and curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and usest.id_usuario = ? ORDER BY curso.nombre asc",
    [idEst],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
  console.log(cursos);
  res.send(cursos);
});

router.get("/cursosEstFech/:idEst", async (req, res) => {
  const { idEst } = req.params;
  const cursos = await pool.query(
    "SELECT curso.id_curso, curso.nombre as nombreCurso , curso.imagen, curso.litle_descripcion, curso.created_at, ustutor.nombres as tutorNombre, ustutor.apellidos as tutorApellido, usest.nombres as estNombre, usest.apellidos as estApellido, etiqueta.nombre as nombreEtiqueta FROM curso, tutor, usuario as ustutor, usuario as usest, usuario_has_curso, curso_has_etiqueta, etiqueta WHERE curso.TUTOR_id_tutor=tutor.id_tutor and ustutor.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso=usuario_has_curso.CURSO_id_curso and usuario_has_curso.USUARIO_id_usuario = usest.id_usuario and curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and usest.id_usuario = ? ORDER BY curso.created_at desc",
    [idEst],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
  console.log(cursos);
  res.send(cursos);
});

/*este es el que se usara ahora*/
router.post("/login", async (req, res) => {
  console.log("cuenta");
  const { user, pass } = req.body;
  /* const pass = req.body.pass; */

  const cuenta = await pool.query(`SELECT * FROM usuario where correo=?`, user);
  if (user && pass) {
    //si existen
    console.log(cuenta);
    if (cuenta.length != 0) {
      if (
        user == cuenta[0].correo &&
        bcrypt.compareSync(pass, cuenta[0].contrasena)
      ) {
        let passwordHash = await bcrypt.hash(pass, 8);
        console.log(cuenta); //ESTO SE IMPRIME EN CONSOLA
        res.json({
          mensaj: "correcto",
          contra: cuenta[0].contrasena,
          id_usuario: cuenta[0].id_usuario,

          contraEnt: pass,
          passwordHash: passwordHash,
        });
      } else {
        console.log(cuenta);
        res.json({
          mensaj: "incorrecto MAL",
          contra: cuenta[0].contrasena,
          contraEnt: pass,
        });
      }
    } else {
      //debo aumentar este if para el bug que viene
      res.json({
        mensaj: "incorrecto MAL",

        contraEnt: pass,
      });
    }
  }
});

router.post("/registerTutor", async (req, res) => {
  const {
    USUARIO_id_usuario,
    academicTraining,
    lastJob,
    currentJob,
    extraJob,
    profileLink,
  } = req.body;
  console.log(req.body);

  const us = await pool.query(`SELECT * FROM usuario where id_usuario=?`, USUARIO_id_usuario);
  if (us.length != 0) {
  const tutor = await pool.query(
    `insert into tutor ( USUARIO_id_usuario
        academicTraining,
        lastJob,
        currentJob,
        extraJob,
        profileLink,) values (?, ?, ?, ?, ?, ?)`,
    [
      USUARIO_id_usuario,
      academicTraining,
      lastJob,
      currentJob,
      extraJob,
      profileLink,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
  } else {
    console.log("ya hay cuenta con el gmail");
    res.json({
      mensaj: "incorrecto MAL",
    });
  }
  console.log("sale del post");
});

module.exports = router;
