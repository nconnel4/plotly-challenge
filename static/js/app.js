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

function getDemographics(id) {
    d3.json("samples.json").then(data => {
        var metaData = data.metadata;

        // filter demographic data for subject id selected
        var testSubject = metaData.filter(subject => {
            return subject.id == id;
        });

        // assign variable for demographic info box
        var demographicBox = d3.select("#sample-metadata");

        // clear demographic info box
        demographicBox.selectAll("*").remove();

        for(var [key, value] of Object.entries(testSubject[0])) {
            demographicBox
                .insert("h5")
                .text(`${key.toUpperCase()}: ${value}`);
        };

    });
}

function getSamples(id) {
    d3.json("samples.json").then(function(data) {
        console.log(data)
    })
}


function optionChanged() {

    var dropDown = d3.select("#selDataset");
    var subjectId = dropDown.property("value");

    console.log(subjectId);
    getSamples(subjectId);
    getDemographics(subjectId);
}



init();