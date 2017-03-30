/// HELPER FUNCTION

function InsertDisplay(){
    
    var displayAidHolder = AidBoxes.append("div")
    .attr("class","displayAidHolder");
    
   /* var CheckBoxes = displayAidHolder.append("input")
    .attr("name",function(d){
        return "Display"+d.Location;
    })
    .attr("class","checkBox")
    .attr("type","checkbox")
    .property("checked",function(d){
         //(d);
         //(d.Location+":"+d.Display);
        return +d.Display==1;
    });*/
    
    /*var Textbox = displayAidHolder.append("div")
                .attr("class",function(){
                    return "checkBoxTxt ";
                })
                .text("Display");*/
}

// function selectOnlyAS(obj){
//     return obj.Type=="AS";
// }
// function selectOnlyMS(obj){
//     return obj.Type=="MT";
// }

///MAIN FUNCTION


    
//now that I have the object for all data
//will show those objects in the space
var w=500;
var h=100;

 (Stations);
// var AidStations = Stations.filter(selectOnlyAS);
AidStations = Stations;
 (AidStations);
 //(AidStations);

var AidBoxes = d3.select(".inputform")
    .selectAll("div")
    .data(AidStations)
    .enter()
    .append("div")
    .attr("class",function(d){

            return "AidBox";

    })
    .attr("number",function(d,i){ return +i});
    

var Titles = AidBoxes.append("div")
    .attr("class","Titles")
    .text(function(d){
        if (d.Type=="MT"){
            return d.Location;
        }
        else{
            return +d.Location;
        }
    });
    
var names = ['Stress'];

for (var i =0; i< names.length; i++){
    
    var CurrentCapacity = AidBoxes.append("div")
    .attr("class","Profession")
    .text(function(d){
        return names[i] +": "+d[names[i]]+" ";
    });
    
var Fields = AidBoxes.append("input")
    .attr("class","input_field")
    .attr("type","text")
    .attr("id",function(d){
        if (d.Type=="AS"){ return "AS"+d.Location; }
        else { return "MT"+d.Location; }
    })
    .attr("name",function(d){
        return names[i] + "" +d.Location;
    })
    .attr("value",function(d){
        return +d[names[i]];
    });
    
}


//now put the check-boxes to select status of the aid station

InsertDisplay();
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//submit button

var submit = d3.select("form")
                .append("div")
                .attr("value","Update")
                .attr("class","submit")
                .text("UPDATE")
                .on("click",function(){
                    var form = document.getElementById("inputform");
                    form.submit();
                });
                