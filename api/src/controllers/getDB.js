const { Router } = require('express');
const { Videogame, Genres } = require ('../db')
const axios = require('axios');

const getDB = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })
}

module.exports = { getDB }
