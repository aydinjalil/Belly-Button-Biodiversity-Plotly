

// console.log(sample_data);


function init(){
	var selector = d3.select("#selDataset");

	d3.json("../../samples.json").then((sampleNames) => {
		sampleNames.names.forEach((sample) => {
			selector.append("option")
			.text(sample)
			.property("value", sample);
		});
		chart(sampleNames.names[0]);
	});
}



function chart(id){
	d3.json("../../samples.json").then((sample_collection) => {
		sample_collection.samples.forEach((otu)=>{
			if (otu.id === id){
				var data = [{
			    	x: otu.otu_ids.slice(0,10),
			    	y: otu.sample_values.slice(0,10),
			    	mode: "markers",
			    	text: otu.otu_labels,
			    	marker: {
			    		color: otu.otu_ids,
			    		size: otu.sample_values,
			    		width: 1
			    	},
			   	 	type: "bar",
			   	 	orientation: "h"
  				}];
  				Plotly.newPlot("bar", data);
			}
			
		});
	});
	
	

  // Create the data array for our plot
  

  // Plot the chart to a div tag with id "bar-plot"
}
function optionChanged() {

	selectValue = d3.select('select').property('value')
	d3.select('body')
		.append('p')
		.text(selectValue + ' is the last selected option.')
};
init();

