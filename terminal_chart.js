const blessed = require('blessed')
const contrib = require('blessed-contrib')
const geoloc = require('./get_location');

function drawChart(tides, city) {
    // Extract Data
    const date = Object.keys(tides)[0];
    const data = tides[date];
    const table = { x: [], y: [] };
    data.forEach(e => {
        table.x.push(e[0]);
        table.y.push(e[1]);
    });

    // Prepare Render
    let screen = blessed.screen();
    let grid = new contrib.grid({ rows: 1, cols: 2, screen: screen });
    let line = grid.set(0, 0, 1, 1, contrib.line,
        {
            style:
            {
                line: "yellow"
                , text: "green"
                , baseline: "black"
            }
            , xLabelPadding: 3
            , xPadding: 5
            , label: `Tides of ${date}`
        });

    let map = grid.set(0, 1, 1, 1, contrib.map, { label: 'Harbor Location' })

    // Pass Data
    screen.append(line);
    screen.append(map)
    line.setData([table]);

    // Map Handler


    screen.key(['escape', 'q', 'C-c'], (ch, key) => {
        return process.exit(0);
    })

    geoloc(city).then(e => { 
        map.addMarker({ "lon": e.lng, "lat": e.lat, color: "red", char: "X" }) 
        screen.render();
    });

}

module.exports = drawChart;