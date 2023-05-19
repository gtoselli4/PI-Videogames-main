const { Router } = require('express');
const { Country, Activity } = require ('../db')
const axios = require('axios');

const getApi = async () => {
  const apiUrl = await axios.get('https://api.rawg.io/api/games?key=66ba2e9a21714d1c8edfc51a257e626d');
  const apiInfo = await apiUrl.data.map(e => {
    return {
      name: e.name,
      description: e.tags,
      platforms: e.platforms,
      img: e.background_image,
      released: e.released,
      rating: e.rating,
    }
  });
  return apiInfo
}


module.exports = { getApi }
