const { Router } = require('express');
const { Videogame, Genres } = require ('../db')
const axios = require('axios');
const { getApi } = require ('../controllers/getApi.js')
const { getDB } = require ('../controllers/getDB.js')

const getAllVideogames = async () => {
  let apiInfo = await getApi();
  const dbInfo = await getDB();
  const info = apiInfo.concat(dbInfo);
  return info
}

module.exports = { getAllVideogames }
