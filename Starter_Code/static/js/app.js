

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
		// sampleNames.metadata.forEach((meta)=>{
		// 	var met_cond = meta.meta === id;
		// 	// console.log(meta[met_cond]);
		// });

		// div_metadata = d3.select("#sample-metadata");
		// div_metadata.html("");

		// Object.entries(sampleNames).forEach(function([key, value]){
		// 	var row = div_metadata.append("p");
		// 	row.text(key + ": " + value);
		// })	
		var div_metadata = d3.select("#sample-metadata");
			div_metadata.html("");
			Object.entries(meta).forEach(([key, value])=>{
				console.log(key + ": " + value);
				if (key  === "id" && value === "940") {
					var row = div_metadata.append("p");
					row.text(key + ": " + value);
				}

			});
	})
	
}

// function filter(data){
// 	var filtered_data = ufo_data.filter(function(_data) {
// 				return _data.country === input.property("value");
// 			});
// }


function chart(id){
	console.log(id);
	
	d3.json("../../samples.json").then((sample_collection) => {
		// Object.entries(sample_collection.samples).forEach(([key, value])=>{
		// 	console.log(key + ": " + value);
		// });
		
		sample_collection.samples.forEach((otu)=>{
			// var otu_ids;
			// var sample_values;
			// var labels;

			Object.entries(otu).forEach(([key, value])=>{
				if (key  === "id" && value === id) {
					var x_data = otu.otu_ids.slice(0,10);
					var y_data = otu.sample_values.slice(0,10)
					// var x_reversed = x_data.reverse();
					// console.log(x_reversed);
					var data = [{
				    	x: x_data,
				    	y: y_data,
				    	mode: "markers",
				    	text: otu.otu_labels,
				    	marker: {
				    		// color: (otu.otu_ids),
				    		size: (otu.sample_values).slice(0,10)
				    		// width: 1
				    	},
				   	 	type: "bar",
				   	 	// orientation: "h",
				   	 	rotation: 90
  				}];

  				var layout = {
  					xaxis:{type: 'category'}
  				};

  				Plotly.newPlot("bar", data, layout);
				}

			});

				
			
		});
	});
	
}
function optionChanged(new_id) {

	// 
	chart(id);
	meta_data(id);
};
init();

