
// d3.select("body").transition()
//     .style("background-color", "black");


// d3.select("#wrapper").selectAll("p")
//     .data([4, 8, 15, 16, 23, 42])
//   .enter().append("p")
//     .text(function(d) { return "I’m number " + d + "!"; });
// d3.selectAll("p").style("color", function() {
//   return "hsl(" + Math.random() * 360 + ",100%,50%)";
// });

// var section = d3.selectAll("section");
// var div = section.append("div");
// div.html("Hello, world!");

// var data = [4, 8, 15, 16, 23, 42];
// d3.select(".chart")
//   .selectAll("div")
//     .data(data)
//   .enter().append("div")
//     .style("width", function(d) { return d * 10 + "px"; })
//     .text(function(d) { return d; });


// var data = [4, 8, 15, 16, 23, 42];
// var chart = d3.select(".chart");
// var bar = chart.selectAll("div");
// var barUpdate = bar.data(data);
// var barEnter = barUpdate.enter().append("div");
// barEnter.style("width", function(d) {
//   return d * 10 + "px"; });
// barEnter.text(function(d) {return d; });

var data = [4, 8, 15, 16, 23, 42];

d3.csv("data/PlayerData.csv")
    .row(function(d) { return {position: d.Pos,
                               playerName:  d.FirstName + " " + d.LastName, 
                               team: d.Team,  
                               passCompletions: d.PassCmps,
                               passYards: d.PassYards,
                               passTdLessThan10: d.Pass_TD1,
                               passTdLessThan20: d.Pass_TD10,
                               passTdLessThan30: d.Pass_TD20

                             }; })
    .get(function(error, rows) { console.log(rows); });
//then set up filter by position



//sets length/height for bars
var width = 420, 
    barHeight = 20;

//sets limits for horizontal(x) bar graphs
var x = d3.scale.linear()
    //input values are capped at the largest data value "42"
    .domain([0, d3.max(data)])
    //output values will be the width 
    .range([0, width]);

//assigns size of entire graph
var chart = d3.select(".chart")
    //width will be 420
    .attr("width", width)
    //height of graph is 20 * number of values in array which is 6, so 6 rows
    .attr("height", barHeight * data.length);

//generating group(g) elements (bars) in chart
var bar = chart.selectAll("g")
    .data(data)
  //adding new g elements via .enter
  .enter().append("g")
    //determines how much over and down to push the next g
    .attr("transform", function(d, i) { return "translate(0, " + i * barHeight + ")"; });

//appends rectangle with corresponding width and heightx`x``
bar.append("rect")
  .attr("width", x)
  .attr("height", barHeight - 1);

//appends text values
bar.append("text")
  //will place text 3 units to left of end of width so able to see entire text
  .attr("x", function(d) { console.log(d); return x(d) - 3; })
  //size of text will be 1/2 of bar height
  .attr("y", barHeight /2)
  //dy offset used to center text vertically
  .attr("dy", ".35em")
  //returns text from data array
  .text(function(d, i) { return d; });
