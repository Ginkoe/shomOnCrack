const blessed = require('blessed')
const contrib = require('blessed-contrib')

function drawChart(tides) {
    let screen = blessed.screen();
    let line = contrib.line(
        {
            style:
            {
                line: "yellow"
                , text: "green"
                , baseline: "black"
            }
            , xLabelPadding: 3
            , xPadding: 5
            , label: ''
        });

    const date = Object.keys(tides)[0];
    const data = tides[date];
    const table = {x: [], y: []};
    data.forEach(e => {
        table.x.append(e[0]);
        table.y.append(e[1]);
    });

    screen.append(line);
    line.setData([table]);

    screen.key(['escape', 'q', 'C-c'], (ch, key) => {
        return process.exit(0);
    })

    screen.render();

}

module.exports = drawChart;