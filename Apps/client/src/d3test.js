

const svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400)

svg.append("line")
    .attr("x1", 20)
    .attr("y1", 70)
    .attr("x2", 100)
    .attr("y2",350)
    .attr("stroke","brown")
    .attr("fill", "blue")