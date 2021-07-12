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
        var sampleValues = subjectSamples.sample_values;
        console.log(sampleValues);
        
        // generate to otu labels
        var otuLabels = otuIds.map(id => 'OTU ' + id);


        // get top 10 bacteria cultures
        var top10Samples = sampleValues.slice(0, 10).reverse();
        var topl10Labels = otuLabels.slice(0,10).reverse();
 

        // generate bar chart
         var trace1 = {
             x: top10Samples,
             y: topl10Labels,
             orientation: "h",
             type: "bar"
         };

         var data1 = [trace1];

         var layout1 = {
             title: "Top 10 Bacteria Culture Found",
             yaxis: {
                 type: "category"
             }
         }

         Plotly.newPlot("bar", data1, layout1)

    })
}


function optionChanged(subjectId) {

    console.log(subjectId);
    getSamples(subjectId);
    getDemographics(subjectId);
}



init();