set SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
start transaction;
set time_zone = "+00:00";

create table `usuario` (
  `id_usuario` integer(11) not null AUTO_INCREMENT,
  `nombres` varchar(25) not null,
  `apellidos` varchar(25) not null,
  `correo` varchar(50) not null,
  `contrasena` varchar(80) not null,
  `fotografia` varchar(255) default NULL,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
  primary key(id_usuario)
) ENGINE=InnoDB default CHARset=utf8mb4;

insert into `usuario` (`nombres`, `apellidos`, `correo`, `contrasena`) values
('Alvaro', 'Linera', 'linerita33@gmail.com', '$2a$08$2ACc0z7XlRP0dwQNl6qQ8uq28Vy6XFsXCTL24ljAkYb2g9ELC6RLy'),
('Adrianita', 'Salvatierra', 'adrianapress2030@gmail.com', '$2a$08$9rFIGKccv21sDk3Fyg45ROss6aA.NHKaCoYD4Ld3YvUUKWxn4u4/m'),
('Javier', 'Filgrana Agreda', 'jav15porsiempre@gmail.com', '$2a$08$CZ3As1yKDgx3Hkhpa5RPfuFO7/vt6f4/EGBHuEto5HIw1ls.wzn1e'),
('Mauricio', 'Huayta Villanueva', 'andres30porsiempre@gmail.com', '$2a$08$bprNMPJzKSoI.R9L22Sr4uKgiRUojqXA4KDrvUe0XbfGsewLR4RTm'),
('Alfredo', 'Lazaro Poma', 'alfredo18porsiiempre@gmail.com', 'alfredo2018'),
('Ivan', 'Martinez Achata', 'elviscocho@gmail.com', 'elviscocho2020'),
('Evo', 'Morales', 'evito33@gmail.com', '$2a$08$mq40uU3xro1GM4JSZ8oKqOcYnLYixwrzO3Y7YT7TdBN1qFr4m.Fjy'),
('Arce', 'Catocora', 'catacora2025@gmail.com', 'presidente2025'),
('Leticia', 'Blanco', 'laquenoteaprueba@gmail.com', 'algoritmosavanzados'),
('Mauricio', 'Montencinos', 'aceonepiece@gmail.com', 'mauricio1010'),
('Marcelo', 'Jaldin', 'sintarea09@gmail.com', 'tallerdebasedatos'),
('Vladimir', 'Oropeza', 'macporsiempre@gmail.com', 'programación web');

create table `tutor` (
  `id_tutor` integer(11) not null AUTO_INCREMENT,
  `USUARIO_id_usuario` integer(11) not null,
  `bibliografia` varchar(4096) not null,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
  primary key(id_tutor),
  constraint TUTOR_USUARIO_id_fk foreign key(USUARIO_id_usuario) references usuario(id_usuario)
) ENGINE=InnoDB default CHARset=utf8mb4;

insert into `tutor` (`bibliografia`, `USUARIO_id_usuario`) values
('Ingeniero en informatica de Jala, docente de la UMSS', 1),
('Linux System Engineer', 2),
('Integrante de la sociedad científica de estudiantes de la carrera de Informática', 3),
('Fundador de la empresa de software Kunza', 4),
('Director de carrera de informática de la UMSS', 5),
('Primer ejecutivo de centro de estudiantes de la carrera de informática en la UMSS', 6);

create table `curso` (
  `id_curso` integer(11) not null AUTO_INCREMENT,
  `TUTOR_id_tutor`integer(11) not null,
  `nombre` varchar(255) not null,
  `imagen` varchar(255) not null,
  `inscritos` integer(11) default null,
  `descripcion` varchar(4096) not null,
  `litle_descripcion` varchar(128) not null,
  `requisitos` varchar(255) not null,
  `duracion` integer(11) not null,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
  primary key(id_curso),
  constraint CURSO_TUTOR_id_fk foreign key(TUTOR_id_tutor) references tutor(id_tutor)
)ENGINE=InnoDB default CHARset=utf8mb4;

insert into `curso` (`TUTOR_id_tutor`, `nombre`, `imagen`, `inscritos`, `descripcion`, `litle_descripcion`, `requisitos`, `duracion`) values
(1, 'Aprende PHP', 'php.jpg', 9, 'Este curso esta lleno de tips y técnicas, además de la creación de un sitio Web real con funciones muy avanzadas y un área de administración para hacer un sitio 100% dinámico.
Además de las tecnologías anteriores, crearemos galerías, formularios, validaciones, un carrito en línea con cotizador, registros a la base de datos, sistema de inicio de sesión, agregar la información dinámicamente desde la Base de Datos MySQL y mucho más!', 'En este curso aprenderá lo más básico para dominar el lenguaje de programación.', 'Conocimiento básico en programación.', 33),
(2, 'Curso Maestro de Python', 'python.jpg', 45, 'Este es el curso en español más completo y exhaustivo que encontrarás sobre Python en Wdemy. Perfectamente estructurado y balanceado, introduce todos los temas de forma sencilla, gradual y 100% práctica. Todos los temas han sido cuidadosamente preparados.', 'Colocamos a tu disposicón el curso más completo, intuitivo y práctico para mejorar tus skills personales.', 'No nececitas tener conocimento en programacion para tomar este curso.', 24),
(3, 'Docker, de principiante a experto', 'docker.png', 39, '¿Cansado de querer aprender Docker? ¿Te resulta muy difícil? ¿Lo has oído pero no sabes de qué trata? Todo eso llegó a su fin, al finalizar este curso serás un experto!\r\n\r\nNo hay mejor manera de aprender que con la práctica, así que este curso te ofrece muchísimos ejercicios donde podrás aprender a crear tus propias aplicaciones en Docker. Aprenderás a crear contenedores MySQL, Postgres, Jenkins, WordPress, PrestaShop, Saleor, Mongo, Nginx, Apache, SSL, Tomcat, Guacamole, Drupal y muchas más!.', 'Te presentamos uno de nuestros cursos estrella, diseñado cuidadosamente para que cualquier principiante se convierta en experto.', 'Para este curso necesitas tener nocion basica sobre Linux\r\n.', 35),
(4, '¡GIT y GITHUB desde cero!', 'git.png', 10, 'Aprende los repositorios más utilizados a nivel mundial y lleva tus conocimientos a otro nivel.\r\nVerás como manejar un repositorio local (GIT) a través del uso de la terminal y como manejar el repositorio remoto a través de la plataforma Github. Aprenderás a mantener tus proyectos organizados para que tu trabajo en equipo sea eficiente y también verás que interfaces de usuarios podrías utilizar en reemplazo de la terminal.', 'El curso perfecto para explotar a la herramienta más utilizado por los desarrolladores de software a nivel globar; te presentamos a Git-GitHub.', 'No necesitas conocimiento previo para este curso.', 4),
(5, 'Fotomontajes con Photoshop', 'photoshop.jpg', 218, 'En este curso aprenderás a dominar la creación de selecciones y máscaras para poder realizar montajes y composiciones en Photoshop. La idea es explicar los fundamentos que hay detrás de los procesos, así que encontrarás algo de la teoría de la imagen digital, de esta manera no tendrás que memorizar comandos ni pasos para conseguir el resultado que deseas al momento de realizar fotomontajes realistas en Photoshop.', 'Nuestro curso de Photoshop es el más completo a comparación de la compentencia por su gran contenido teórico y práctico', 'No nececitas conocimentos previos para tomar este curso.', 20),
(6, 'Micro conferencias de negocios', 'charla.jpg', 19, '¿Qué pasa cuando las ventas bajan en tu empresa? o ¿No sabes ni como armar un mejor producto que la competencia?  Todos te dicen que debes de vender y seguir vendiendo, cuando tus ventas bajan comienzas a tomar todos los cursos de ventas y tal vez eso no es la solución, tal vez tu mercado no ve un gran valor en tu producto, tal vez no hayas desarrollado una propuesta única de valor o tal vez tu marketing está bien encausado.', 'Te enseñamos las mejores técnias y hábitos para hacer crecer cualquier tipo de negocio. Tú tienes la idea, y te enseñamos a convertirlo en una empresa.', 'No necesitas tener conocimientos previos para tomar este curso.', 30);


create table `etiqueta` (
  `id_etiqueta` integer(11) not null AUTO_INCREMENT,
  `nombre` varchar(64) not null,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
  primary key(id_etiqueta)
) ENGINE=InnoDB default CHARset=utf8mb4;

insert into `etiqueta` (`nombre`) values
('python'),
('programacion'),
('git'),
('github'),
('fotomontajes'),
('fotografía'),
('photoshop'),
('php'),
('conferencias'),
('conceptos'),
('negocios'),
('docker'),
('contenedor');

create table `curso_has_etiqueta` (
  `CURSO_id_curso` integer(11) not null,
  `ETIQUETA_id_etiqueta` integer(11) not null,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
primary key(CURSO_id_curso, ETIQUETA_id_etiqueta),
constraint CURSO_has_ETIQUETA_CURSO_id_fk foreign key(CURSO_id_curso) references curso(id_curso),
constraint CURSO_has_ETIQUETA_ETIQUETA_id_fk foreign key(ETIQUETA_id_etiqueta) references etiqueta(id_etiqueta)
) ENGINE=InnoDB default CHARset=utf8mb4;

insert into `curso_has_etiqueta` (`CURSO_id_curso`, `ETIQUETA_id_etiqueta`) values
(1, 2),
(1, 8),
(2, 1),
(2, 2),
(3, 13),
(3, 9),
(4, 3),
(4, 4),
(5, 5),
(5, 6),
(5, 7),
(6, 10),
(6, 11),
(6, 12);

create table `modulo` (
  `id_modulo` integer(11) not null AUTO_INCREMENT,
  `CURSO_id_curso` integer(11) not null,
  `nombre` varchar(64) not null,
  `descripcion` varchar(4096) not null,
  `duracion` integer(11) not null,
  `nota` integer(11) default NULL,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
  primary key(id_modulo, CURSO_id_curso),
  constraint MODULO_CURSO_id_fk foreign key(CURSO_id_curso) references curso(id_curso)
) ENGINE=InnoDB default CHARset=utf8mb4;

insert into `modulo` (`CURSO_id_curso`, `nombre`, `descripcion`, `duracion`) values
(1, 'introduccion a php', 'en este modulo aprenderas la sintaxis basica del lenguaje de programacion de php, ademas de ciclos y cosas esenciales del lenguaje', 1),
(2, 'introduccion a python', 'en este modulo aprenderas la sintaxis basica del lenguaje de programacion python', 1),
(4, 'presentacion del curso ', 'se hablara de forma general sobre la herramiente de git y github, y la utilidad que tiene', 1),
(3, 'introduccion a Docker', 'En esta seccion aprenderas los concepto basicos sobre docker y la forma en la que esta herramienta trabaja', 2),
(5, 'Introduccion a la heramienta de photoshop', 'En esta seccion aprenderas sobre las partes mas importantes de la herramienta de photoshop', 1),
(6, '¿que es un negocio?', 'En esta seccion el orador empieza a introducirnos a la vida del neciocio y como funciona', 1);

create table `usuario_has_curso` (
  `USUARIO_id_usuario` int(11) not null,
  `CURSO_id_curso` int(11) not null,
  `created_at` timestamp not null default current_timestamp(),
  `updated_at` timestamp not null default current_timestamp(),
  primary key(USUARIO_id_usuario, CURSO_id_curso),
  constraint USUARIO_has_CURSO_USUARIO_id_fk foreign key(USUARIO_id_usuario) references usuario(id_usuario),
  constraint USUARIO_has_CURSO_CURSO_id_fk foreign key(CURSO_id_curso) references curso(id_curso)
) ENGINE=InnoDB default CHARset=utf8mb4;

insert into `usuario_has_curso` (`USUARIO_id_usuario`, `CURSO_id_curso`) values
(7, 1),
(7, 3),
(7, 5),
(8, 2),
(8, 5),
(8, 4),
(9, 3),
(9, 5),
(9, 6),
(10, 4),
(10, 6),
(10, 1),
(11, 5),
(11, 2),
(11, 4),
(12, 6),
(12, 2),
(12, 5);