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

        optionChanged(names[0])

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
    d3.json("samples.json").then(data => {
        var samples = data.samples

        // filter sample data for subject id
        var subjectSamples = samples.filter(subject => {
            return subject.id == id;
        })[0];
        console.log(subjectSamples);

        var otuIds = subjectSamples.otu_ids;
        console.log(otuIds);

        var sampleValues = subjectSamples.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var otuLabels = otuIds.slice(0, 10).map(id => 'OTU ' + id);
        console.log(otuLabels);

         var trace = {
             x: sampleValues,
             y: otuLabels,
             orientation: "h",
             type: "bar"
         };

         var data = [trace];

         var layout = {
             title: "Top 10 Bacteria Culture Found",
             yaxis: {
                 type: "category"
             }
         }

         Plotly.newPlot("bar", data, layout)

    })
}


function optionChanged(subjectId) {

    console.log(subjectId);
    getSamples(subjectId);
    getDemographics(subjectId);
}



init();