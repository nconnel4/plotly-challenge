function init() {
    
    //load data from samples.json
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        console.log(names);

        var dropDown = d3.select("#selDataset");

        dropDown
            .selectAll("options")
            .data(names)
            .enter()
            .append("option")
            .text(function (d) { return d; })
            .attr("value", function (d) { return d; });

        optionChanged();
    })

}


function optionChanged() {

    var dropDown = d3.select("#selDataset");
    var subjectId = dropDown.property("value");

    console.log(subjectId)
}

init();