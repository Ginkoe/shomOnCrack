const axios = require('axios');
const config = require('./config');

async function getLocation(city) {
    return new Promise(async (resolve, reject) => {
        const API_KEY = config.keys.opencage;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}&pretty=1`
        console.log(url)
        const response = await axios.get(url);
        let {lat, lng} = response.data.results[0].geometry;
        resolve({lat, lng})
    })
}

module.exports = getLocation;