
    <script src="http://d3js.org/d3.v3.js"></script>
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
    .range([0, width])

    var y = d3.scale.linear()
    .range([height, 0])

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left").ticks(20)

    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xValue = function(d) { return d.Kdratio;}
    var yValue = function(d) {return d.likes;}

    d3.csv("dota2_data.csv", function(error, data) {

        data.forEach(function(d){
            d.likes = +d.likes;
            d["Kdratio"] = +d["Kdratio"];
        })

        x.domain([-(d3.max(data, xValue)+1), d3.max(data, xValue)+1])
        y.domain([-(d3.max(data, yValue)+1), d3.max(data, yValue)+1]);

        svg.selectAll(".point")
        .data(data)
        .enter().append("circle")
        .attr("class", function(d) { return "point negative" })
        .attr("cx", function(d) {return x(Math.min(0, d.Kdratio));})
        .attr("cy", function(d) {return y(d.likes);})
        .attr("r", 5)

        svg.append("g")
        .attr("class", "x axis")
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

        svg.append("g")
        .attr("class", "y axis")
        .attr('transform', 'translate(0,0)')
        .call(yAxis)


        });