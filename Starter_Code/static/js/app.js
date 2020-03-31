

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
		});
	});
	
}

// function filter(data){
// 	var filtered_data = ufo_data.filter(function(_data) {
// 				return _data.country === input.property("value");
// 			});
// }


function chart(id){
	d3.json("../../samples.json").then((sampleNames) => {

		sampleNames.samples.forEach((sample)=>{

			// Bar Chart Plotly code

					var x_data = [];
					var y_data = [];
					var labels = [];
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

							console.log(y_data);

							var data = [{
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
					   	 	// rotation: 90
  						}];

  				Plotly.newPlot("bar", data);
						// console.log(x_data);
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

