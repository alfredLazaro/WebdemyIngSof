/*
    para ingresar ala BD que esa en un hosting:para terminal, desconosco su uso en otros lados.

    mysql -h bnzejryfzccllt1iv6cd-mysql.services.clever-cloud.com -P 3306 -u uwniakdgootbcctr -p bnzejryfzccllt1iv6cd
    passsword:pl7TQyNVrNog321QJICH
*/

const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const bcrypt = require("bcryptjs");


router.get("/cursos", async (req, res) => {
  const repetidos = await pool.query(
    "SELECT curso.id_curso, curso.nombre as nombreCurso, curso.imagen, curso.inscritos, curso.created_at, etiqueta.nombre as nombreEtiqueta, usuario.nombres as nomT, usuario.apellidos as apellT FROM curso, curso_has_etiqueta, etiqueta, tutor, usuario WHERE curso.id_curso = curso_has_etiqueta.curso_id_curso and curso_has_etiqueta.etiqueta_id_etiqueta = etiqueta.id_etiqueta and curso.tutor_id_tutor = tutor.id_tutor and usuario.id_usuario = tutor.usuario_id_usuario ORDER BY inscritos desc,created_at desc"
  );
  res.send(repetidos);
});


router.get("/:idEst/info", async (req, res) => {
  const { idEst } = req.params;
  const cursos = await pool.query(
    "SELECT usuario.nombres, usuario.apellidos FROM usuario WHERE  usuario.id_usuario = ?",
    [idEst],
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

router.get("/:idCurso", async (req, res) => {
  const { idCurso } = req.params;
  const cursos = await pool.query(
    "SELECT curso.*, tutor.lastJob, usuario.nombres, usuario.apellidos FROM curso, tutor, usuario WHERE curso.TUTOR_id_tutor=tutor.id_tutor and usuario.id_usuario = tutor.USUARIO_id_usuario and curso.id_curso = ?",
    [idCurso],
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

router.get("/:idCurso/modulos", async (req, res) => {
  const { idCurso } = req.params;
  const cursos = await pool.query(
    "SELECT modulo.nombre FROM modulo Join curso WHERE id_curso = curso_id_curso and id_curso= ?",
    [idCurso],
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

router.get("/:idCurso/etiquetas", async (req, res) => {
  const { idCurso } = req.params;
  const cursos = await pool.query(
    "SELECT E.nombre FROM etiqueta as E Join curso  Join curso_has_etiqueta WHERE id_curso = curso_id_curso and id_etiqueta=ETIQUETA_id_etiqueta and id_curso= ?",
    [idCurso],
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

  const us = await pool.query(
    `SELECT * FROM usuario where id_usuario=?`,
    USUARIO_id_usuario
  );
  if (us.length != 0) {
    const tutor = await pool.query(
      `insert into tutor ( USUARIO_id_usuario,
        academicTraining,
        lastJob,
        currentJob,
        extraJob,
        profileLink) values (?, ?, ?, ?, ?, ?)`,
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

router.get('/creadosTutor/:idTut', async (req, res) => {
    const { idTut } = req.params;
    const cursos = await pool.query('SELECT curso.* FROM curso, usuario, tutor WHERE curso.TUTOR_id_tutor = tutor.id_tutor and tutor.USUARIO_id_usuario = usuario.id_usuario and id_usuario = ? ORDER BY curso.created_at desc', [idTut], (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    res.send(cursos);
});

router.get("/esTutor/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const cursos = await pool.query(
    "SELECT tutor.* FROM usuario, tutor WHERE usuario.id_usuario = tutor.USUARIO_id_usuario and usuario.id_usuario = ?",
    [idUser],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
  res.send(cursos);
});



router.post("/crearcurso", async (req, res) => {
  const { idTutor, nombreC, image, description, objetives, requirements, duration, tags } = req.body;
  console.log(req.body);
  
  //Creacion curso..
  const curso = await pool.query(
    "insert into curso ( TUTOR_id_tutor, nombre, imagen, descripcion, litle_descripcion ,requisitos ,duracion ,state, inscritos) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      idTutor, 
      nombreC, 
      image, 
      description, 
      objetives, 
      requirements, 
      duration, 
      0,
      0
    ]);

    const ids = await pool.query('SELECT id_curso FROM curso WHERE TUTOR_id_tutor = ? and nombre = ?', [idTutor, nombreC], (err,rows,fields) => {
        if(!err){
            res.json({
              idCurso: rows[0],
            });
        }else{
            console.log(err);
        }
    });
    res.send(ids);
});

router.delete("/deleteCurso/etiquetas", async (req, res) => {
  const { idenCurso } = req.body;
  
  const us = await pool.query(
    `SELECT * FROM curso where id_curso = ?`,
    idenCurso
  );
  if (us.length != 0) {
    console.log("Entra a eliminar curso")
    const etiquetas = await pool.query(
      `DELETE
       FROM curso_has_etiqueta
       WHERE curso_has_etiqueta.CURSO_id_curso = ?`,
      [
        idenCurso
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
    console.log("no existe tal curso, para eliminar");   
  }
  console.log("sale del post");
});

router.delete("/deleteCurso/modulos", async (req, res) => {
  const { idenCurso } = req.body;
  
  const us = await pool.query(
    `SELECT * FROM curso where id_curso = ?`,
    idenCurso
  );
  if (us.length != 0) {
    const modulos = await pool.query(
      `DELETE
       FROM modulo
       WHERE modulo.CURSO_id_curso = ?`,
      [
        idenCurso
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
    console.log("no existe tal curso, para eliminar");   
  }
  console.log("sale del post");
});

router.delete("/deleteCurso/usuarios", async (req, res) => {
  const { idenCurso } = req.body;
  
  const us = await pool.query(
    `SELECT * FROM curso where id_curso = ?`,
    idenCurso
  );
  if (us.length != 0) {
    const usuarios = await pool.query(
      `DELETE 
       FROM usuario_has_curso
       WHERE usuario_has_curso.CURSO_id_curso = ?`,
      [
        idenCurso
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
    console.log("no existe tal curso, para eliminar");   
  }
  console.log("sale del post");
});

router.delete("/deleteCurso", async (req, res) => {
  const { idenCurso } = req.body;
  
  const us = await pool.query(
    `SELECT * FROM curso where id_curso = ?`,
    idenCurso
  );
  if (us.length != 0) {
    const cursos = await pool.query(
      `DELETE
       FROM curso
       WHERE curso.id_curso = ?`,
      [
        idenCurso
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
    console.log("no existe tal curso, para eliminar");   
  }
  console.log("sale del post");
});

router.get('/creadosTutor/:idTut', async (req, res) => {
  const { idTut } = req.params;
  const cursos = await pool.query('SELECT curso.* FROM curso, usuario, tutor WHERE curso.TUTOR_id_tutor = tutor.id_tutor and tutor.USUARIO_id_usuario = usuario.id_usuario and id_usuario = ? ORDER BY curso.created_at desc', [idTut], (err,rows,fields) => {
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
  res.send(cursos);
});

router.get('/idtutor/:idUs', async (req, res) => {
  const { idUs } = req.params;
  const cursos = await pool.query('SELECT id_tutor FROM tutor WHERE USUARIO_id_usuario = ?', [idUs], (err,rows,fields) => {
      if(!err){
          res.json(rows[0]);
      }else{
          console.log(err);
      }
  });
  res.send(cursos);
});

router.post("/crearcurso/addEtiqueta", async (req, res) => {
  const { etiqueta } = req.body;
  console.log(req.body);

  const idEt = await pool.query(`SELECT id_etiqueta FROM etiqueta WHERE nombre = ?`,[etiqueta]);

  if (idEt.length == 0) {
    console.log("Inserta etiqueta en bd");
    const insertEtiq = await pool.query(
      `insert into etiqueta (nombre) values (?)`,[etiqueta],(err, rows, fields) => {
        if (err) {
          console.log(err);
        }else{
          res.json({
            id_etiqueta: rows.insertId    //devuelve el id agregado en insert
          })
        }
      }
    );
  }else{
    res.json({
        id_etiqueta: idEt[0].id_etiqueta   
    })
  }
});

router.post("/crearcurso/addCursoEtiq", async (req, res) => {
  const { idEtiqueta, idCurso } = req.body;
  console.log(req.body);

  const idEt = await pool.query(`insert into curso_has_etiqueta ( CURSO_id_curso,ETIQUETA_id_etiqueta)  values (?,?)`,
  [idCurso, idEtiqueta],
  (err, rows, fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    } 
  }
  );
});

router.post("/crearcurso/updateCurso", async (req, res) => {
  const { 
    TUTOR_id_tutor, 
    nombre, 
    imagen, 
    descripcion, 
    litle_descripcion, 
    requisitos, 
    duracion, 
    id_curso
  } = req.body;
  console.log(req.body);

  const updateCur = await pool.query(`
  UPDATE curso curso 
  SET TUTOR_id_tutor = ?, nombre = ?, imagen = ?, descripcion = ?, litle_descripcion = ?, requisitos = ?, duracion = ?, state = ?, inscritos = ?
  WHERE id_curso = ?`,
  [
    TUTOR_id_tutor, 
    nombre, imagen, 
    descripcion, 
    litle_descripcion, 
    requisitos, 
    duracion, 
    0, 
    0, 
    id_curso
  ],(err, rows, fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    } 
  }
  );
});

router.delete("/crearcurso/deleteCursoEtiq", async (req, res) => {
  const { idenCurso } = req.body;
  
  const enlaces = await pool.query(
    `SELECT * FROM curso_has_etiqueta WHERE CURSO_id_curso = ?`,
    [idenCurso]
  );
  if (enlaces.length != 0) {
    const eliminados = await pool.query(
      `DELETE
       FROM curso_has_etiqueta
       WHERE CURSO_id_curso = ?`,
      [idenCurso],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    console.log("no existe tal curso, para eliminar");   
  }
  console.log("sale del post");
});

router.delete("/crearcurso/deleteEtiquetas", async (req, res) => {
  const eliminados = await pool.query(
    `DELETE
    FROM etiqueta
    WHERE etiqueta.id_etiqueta NOT IN (SELECT E2.id_etiqueta FROM etiqueta as E2, curso_has_etiqueta as CE WHERE E2.id_etiqueta = CE.ETIQUETA_id_etiqueta)`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
  
});

module.exports = router;
