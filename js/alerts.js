function displayAlert(data){
	var message = data[0].Alert;
    
     (message);
    //display runners finished
    d3.select("#alertText")
    .text(message);

}

d3.csv("data/gen_info.csv",displayAlert);