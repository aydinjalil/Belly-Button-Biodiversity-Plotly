

// console.log(sample_data);


function init(){
	var selector = d3.select("#selDataset");

	d3.json("../../samples.json").then((sampleNames) => {
		sampleNames.names.forEach((sample) => {
			selector.append("option")
			.text(sample)
			.property("value", sample);
		});
		plot_bar(sampleNames.names[0]);
	});
}



function plot_bar(id){
	d3.json("../../samples.json").then((sample_collection) => {
		sample_collection.samples.forEach((otu)=>{
			if (otu.id === id){
				var trace = {
		    	x: otu.otu_ids.slice(0,10),
		    	y: otu.sample_values.slice(0,10),
		    	// mode: "markers",
		    	text: otu.otu_labels,
		    	marker: {
		    		color: otu.otu_ids,
		    		size: otu.sample_values
		    	},
		   	 	type: "bar"
  			};

  			var data = [trace];
			}
			

  			// var layout = {
			    
			  //   margin:{t: 20, r: 20, b: 30, l: 40},
	  		// };

	  		Plotly.newPlot("bar", data);
		})
	});
	
	

  // Create the data array for our plot
  

  // Plot the chart to a div tag with id "bar-plot"
}
// function optionChanged() {

// 	selectValue = d3.select('select').property('value')
// 	d3.select('body')
// 		.append('p')
// 		.text(selectValue + ' is the last selected option.')
// };
init();