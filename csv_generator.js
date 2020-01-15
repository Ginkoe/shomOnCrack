const fs = require('fs');
const os = require('os');

function generateCSV(tides) {
    const date = Object.keys(tides)[0];
    const data = tides[date];
    const csv = data.map(e => `${e[0]},${e[1]}`)
    const file = csv.join(os.EOL);
    const filename = date.replace("-", "_");
    console.log(filename)
    console.log("Writing CSV")
    fs.writeFileSync(`TidesOnCrack/${filename}.csv`, file)
}

module.exports = generateCSV