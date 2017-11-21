
//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    scaleX.domain(pointData.map(function(d){return d.countryCode;}));
    scaleY.domain([0, d3.max(pointData.map(function(d){return +d.totalPop}))]);

    d3.selectAll('.xaxis')
        .call(d3.axisBottom(scaleX));

    d3.selectAll('.yaxis')
        .call(d3.axisLeft(scaleY));

    //select all bars in the DOM, and bind them to the new data
    var rects = svg.selectAll('.bars')
        .data(pointData, function(d){return d.countryCode;});

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.
    rects.exit()
        .remove();

    //update the properties of the remaining bars (as before)
    rects
        .transition()
        .duration(200)
        .attr('x',function(d){
            return scaleX(d.countryCode);
        })
        .attr('y',function(d){
            return scaleY(d.totalPop);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return 400 - scaleY(d.totalPop);  //400 is the beginning domain value of the y axis, set above
        });

    //add the enter() function to make bars for any new countries in the list, and set their properties
    rects
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill', "slategray")
        .attr('x',function(d){
            return scaleX(d.countryCode);
        })
        .attr('y',function(d){
            return scaleY(d.totalPop);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return 400 - scaleY(d.totalPop);  //400 is the beginning domain value of the y axis, set above
        });

    //take out bars for any old countries that no longer exist
    //rects.exit()
    //    .remove();

}