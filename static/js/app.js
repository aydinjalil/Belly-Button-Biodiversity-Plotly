
function init(){
	var selector = d3.select("#selDataset");

	d3.json("../../samples.json").then((sampleNames) => {
		sampleNames.names.forEach((sample) => {
			selector.append("option")
			.text(sample)
			.property("value", sample);
		});
		chart(sampleNames.names[0]);
		meta_data(sampleNames.names[0]);
		// console.log(sampleNames.names);
	});
}


function meta_data(id){
	d3.json("../../samples.json").then((sampleNames)=>{
		sampleNames.metadata.forEach((meta)=>{
			if (meta.id === parseInt(id)) {
				var div_metadata = d3.select("#sample-metadata");
				div_metadata.html("");

				Object.entries(meta).forEach(([key, value])=>{
					var row = div_metadata.append("p");
					row.text(key + ": " + value);
				});

				
			};

			// BONUS TASK - Gauge chart
			
			console.log(meta.wfreq);
		});
	});
	
}


function chart(id){
	d3.json("../../samples.json").then((sampleNames) => {

		sampleNames.samples.forEach((sample)=>{

			// Bar Chart Plotly code

					var x_data = [];
					var y_data = [];
					var labels = [];
					var bubble_x = [];
					switch(sample.id){
						case id: 
							sample.otu_ids.forEach((otu_id)=>{
								x_data.push("OTU " + otu_id);
							});
							sample.sample_values.forEach((sample_values)=>{
								y_data.push(sample_values);
							});
							sample.otu_labels.forEach((otu_label)=>{
								labels.push(otu_label);
							});
							sample.otu_ids.forEach((otu_id)=>{
								bubble_x.push(otu_id);
							});

							// Separate data for bar_chart
							var bar_data = [{
							type: "bar",
					    	x: y_data.slice(0,10).reverse(),
					    	y: x_data.slice(0,10).reverse(),
					    	mode: "markers",
					    	text: labels.slice(0,10),
					    	marker: {
					    		// color: (otu.otu_ids),
					    		size: (y_data.slice(0,10)),
					    		width: 1
					    	},
					   	 	orientation: "h",
  						}];

  						// Separate data for bubble chart
  						var bubble_data = [{
  							type: "scatter",
  							y: y_data,
					    	x: bubble_x,
					    	mode: "markers",
					    	text: labels,
					    	marker: {
					    		color: (bubble_x),
					    		size: (y_data),
					    		// sizemode: 'area'
					    	},
  						}];

  						var bubble_layout = {
								  title: 'Bubble Chart',
								  showlegend: false,
								  height: 600,
								  width: 600
								};


  				// Plot bar_chart
  				Plotly.newPlot("bar", bar_data);
  				Plotly.newPlot("bubble", bubble_data);
						break;
					}	
			
		});
	});
	
}
function optionChanged(new_id) {

	chart(new_id);
	meta_data(new_id);
};
init();

