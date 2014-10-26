

d3.csv("data/PlayerData.csv")
    .row(function(d) { 
      var obj = {};
      obj.playerName = d.firstName + " " + d.lastName;
      //iterates over all properties in d
      for(var prop in d) {
        //[] takes value of variable and fills the empty object
        //dereferences object by string value stored in [prop]
        //obj.PlayerID =  d.PlayerID for every property
        obj[prop] = d[prop];
      }
      return obj;
    })
    .get(main);
//then set up filter by position
function main (error, players) {

  //sets length/height for bars
  var width = 20;
      barHeight = 500;

  //sets limits for vertical(y) bar graphs
  var y = d3.scale.linear()
      //input values are capped at the largest data value
      .domain([0, d3.max(players.map(function(players){
        console.log(players.fantasyPoints);
        return players.fantasyPoints;
        })
      )])
      //output values will be the height
      .range([0, barHeight]);
  console.log(players);  

  //assigns size of entire graph
  var chart = d3.select(".chart")
    //width will be
    .attr("width", width * players.length)
    //height will be 500
    .attr("height", barHeight);

  //generating group(g) elements (bars) in chart
  var bar = chart.selectAll("g")
    .data(players)
  //adding new g elements via .enter
  .enter().append("g")
  //determines how much over and down to push the next g
  .attr("transform", function(d, i) {
    return "translate(0, " + i * width + ")";
  });

  //appends rectangle with corresponding width and height`y``
  bar.append("rect")
    //will make width 1 unit shorter than amt allowed
    // for width for border
    .attr("width", width -1)
    .attr("height", y);

  //appends text values
  bar.append("text")
    //size of text will be 1/2 of bar width
    .attr("x", width / 2)
    //will place text 3 units below end of height so able to see entire text
    .attr("y", function(d) { console.log(d); return y(d.fantasyPoints) - 3; })
    //dy offset used to center text horizontally
    .attr("dy", ".35em")
    //returns text from data array
    .text(function(d,i) {return d.fantasyPoints; });
}



// var data = [4, 8, 15, 16, 23, 42];

// //sets length/height for bars
// var width = 420, 
//     barHeight = 20;

// //sets limits for horizontal(x) bar graphs
// var x = d3.scale.linear()
//     //input values are capped at the largest data value "42"
//     .domain([0, d3.max(data)])
//     //output values will be the width 
//     .range([0, width]);

// //assigns size of entire graph
// var chart = d3.select(".chart")
//     //width will be 420
//     .attr("width", width)
//     //height of graph is 20 * number of values in array which is 6, so 6 rows
//     .attr("height", barHeight * data.length);

// //generating group(g) elements (bars) in chart
// var bar = chart.selectAll("g")
//     .data(data)
//   //adding new g elements via .enter
//   .enter().append("g")
//     //determines how much over and down to push the next g
//     .attr("transform", function(d, i) { return "translate(0, " + i * barHeight + ")"; });

// //appends rectangle with corresponding width and heightx`x``
// bar.append("rect")
//   .attr("width", x)
//   .attr("height", barHeight - 1);

// //appends text values
// bar.append("text")
//   //will place text 3 units to left of end of width so able to see entire text
//   .attr("x", function(d) { console.log(d); return x(d) - 3; })
//   //size of text will be 1/2 of bar height
//   .attr("y", barHeight /2)
//   //dy offset used to center text vertically
//   .attr("dy", ".35em")
//   //returns text from data array
//   .text(function(d, i) { return d; });
