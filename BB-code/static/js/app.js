
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const sampleData = d3.json(url);
//console.log(sampleData)

  // reading in the sample data
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata= data.metadata;
    var resultsarray= metadata.filter(sampleobject => 
      sampleobject.id == sample);
    var result= resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });

  });
}
function buildCharts(sample) {
  
  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    var result= resultsarray[0]
  
    var ids = result.otu_ids; //zip
    var labels = result.otu_labels; //lables
    var values = result.sample_values; //values

    // creating the bubble Chart 
  
    var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };
  
      var DataBubble = [ 
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];
  
    Plotly.newPlot("bubble", DataBubble, LayoutBubble);

  //creating the bar Chart
  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
  ];

  var barLayout = {
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);


  });
     }

     function init() {
      // creating the dropdown menu
      var dropdown = d3.select("#selDataset");
  
      d3.json("samples.json").then((data)=> {
          console.log(data)
  
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          getPlots(data.names[0]);
          getDemoInfo(data.names[0]);
      });
  }
     function init() {
      var selector = d3.select("#selDataset");
      
      d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
      
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
      }
      
      function optionChanged(newSample) {
      buildCharts(newSample);
      buildMetadata(newSample);
      }
       

      init();    
  