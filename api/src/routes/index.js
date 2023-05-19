const { Router } = require('express');
const { Videogame, Genres } = require ('../db')
const { getAllVideogames } = require ('../controllers/getAllVideogames.js')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req, res) => {
  const name = req.query.name;
  let videogames = await getAllVideogames();
  if (name) {
    let videogameName = await videogames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    if (videogameName.length === 0) {
        res.status(404).send('Videojuego no encontrado.')
      } else {
        res.status(200).send(videogameName.slice(0, 15))
      }
  }
  else {
      res.status(200).send(videogames)
  }
});

router.get('/videogames/:idVideogame', async (req, res) => {
  const id = req.params.idVideogame;
  let videogames = await getAllVideogames();
  let gameByID = videogames.find(e => e.id === id);
  if (gameByID) {
    res.status(200).send(gameByID);
  } else {
    res.status(404).send('Videojuego no encontrado.');
  }
});

router.post('/videogames', async (req, res) => {
  const { name, description, platform, release, rating, genres } = req.body;

  try {
    const createdVideogame = await Videogame.create({
      title,
      description,
      platform,
      release,
      rating,
      genres,
    });

    if (genres && genres.length > 0) {
      await createdVideogame.setGenres(genres);
    }

    res.status(201).json(createdVideogame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el videojuego.' });
  }
});

router.get('/genres', async (req, res) => {
  try {
    let genres = await Genres.findAll();

    if (genres.length === 0) {
      const response = await axios.get('https://api.rawg.io/api/genres?key=66ba2e9a21714d1c8edfc51a257e626d');
      genres = response.data;
      await Genres.bulkCreate(genres, { include: Videogame });
    }
    res.json(genres);
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error al obtener los géneros.' });
  }
});

module.exports = router;
