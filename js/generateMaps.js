var minuteInterval = 2;



function plotSegment(segmentNumber, PolylineStyling, runners) {
    var polyline = d3.csv('data/milemarkers/milemarkers/mile' + (segmentNumber + 1) + '.csv', function(error, data) {
        var i = 0
        if (error) return console.warn(error);
        //now try to create a mapping of it
        coords = data.map(function(d, i) {
            ////(i);
            return [parseFloat(d.Latitude), parseFloat(d.Longitude)];
        });
        // debugger;
        polyline = L.polyline(coords, PolylineStyling)
            .bindPopup('Runners:' + runners)
            .addTo(pathsLayer);
            //.addTo(map);
        return polyline;
    });
    ////("The next line is the polyline");
    ////(polyline);
    return polyline;
}

function generateLines() {
  
    var roadsClosed = [];

    for (var i = 0; i<5; i++){
      roadsClosed.push(0);
    }
    
    for (var i = 0; i<0; i++){
      roadsClosed[i] = 1;
    }    


    pathsLayer.clearLayers();
    returnArray = [];
    
    var runnerData = d3.csv('SIMULATION/Densities.csv', function(error, data) {

        var minute = getMinute();
        //("Minute: " + minute);
        minute = minute;
        var data = data[parseInt(minute/2)];
        //(data);

        var data = $.map(data, function(value, index) {
            return [+value];
        });


        if (error) return console.warn(error);
        // //(data);

        //debugger;
        for (var i = 0; i < 5; i++) {

            var runners = +data[i+2];
            //set properties of that segment i
            //("runners" + runners);
            var segmentStyle = {
                number: i + 1,
                color: 'green',
                weight: '5',
                opacity: 1
            }
            
            if (roadsClosed[i] != 1){
           	   switch (Math.floor(runners / 1500)) {
                  case 0:
                      break;
                  case 1:
                      segmentStyle.color = 'yellow';
                      break;
                  case 2:
                      segmentStyle.color = 'orange';
                      segmentStyle.weight = '7';
                      break;
                  case 3:
                      segmentStyle.color = 'red';
                      segmentStyle.weight = '8';
                      break;
                  case 4:
                      segmentStyle.color = 'red';
                      segmentStyle.weight = '10';
                      break;
                  case 5:
                      segmentStyle.color = 'red';
                      segmentStyle.weight = '11';
                      break;
                  default:
                      segmentStyle.color = 'green';
              }
            }
            else{
              segmentStyle.color = 'gray';
            }
            
            //(segmentStyle);
            
            //remove the old one
            if (started==1){
                //layerGroup.removeLayer(map);
                map.removeLayer(polylineArr[i]);
                started=1;
            }
            started=1;
            //now add a new one and store it
            polylineArr[i]=plotSegment(i, segmentStyle, runners);
        }
        

    });
    // debugger;
    //return returnArray;

}

function generateWalkLines(){
    var segmentStyle = {
      color: '#FCFBE3',
      weight: '5',
      opacity: 1,
      dashArray: '10,10'
    }
    var polyline = d3.csv('data/milemarkers/milemarkers/mileWalk.csv', function(error, data) {
        var i = 0
        if (error) return console.warn(error);
        //now try to create a mapping of it
        coords = data.map(function(d, i) {
            ////(i);
            return [parseFloat(d.Latitude), parseFloat(d.Longitude)];
        });
        // debugger;
        polyline = L.polyline(coords, segmentStyle)
            .addTo(pathsLayer);
            //.addTo(map);
        return polyline;
    });
    ////("The next line is the polyline");
    ////(polyline);
    polylineArr[27] = polyline;
}

function plotAS(update){
  
  // //Plot markers for the aid stations
  var aidLoc = [];
  var aidColor = [];
  d3.csv("data/AidStations.csv", function(d) {
        // Add a LatLng object to each item in the dataset
        aidLoc = d;
        return {
            Type: d.Type,
            Latitude: +d.Latitude,
            Longitude: +d.Longitude,
            Location: d.Location,
            RaceKM: +d.RaceKM,
            Status: d.Status,
            CurrentPatients: +d.CurrentPatients,
            CumulativePatients: +d.CumulativePatients,
            Beds: +d.Beds
        };
    },
    function(error, rows) {
        ////(rows);
        
        
        AidStationsGEOJSON = []
        
        for (var i = 0; i < 20; i++) {
            //debugger;
            var percent = 100 * (+rows[i].CurrentPatients / +rows[i].Beds);
            ////(+rows[i].CurrentPatients);
            ////(+rows[i].Beds);
            if ((+rows[i].Status) == 2 && rows[i].Type!='MT') {
                AidStationsGEOJSON.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            rows[i].Longitude, rows[i].Latitude
                        ]
                    },
                    properties: {
                        'title': 'Closed',
                        'marker-size': "small",
                        'marker-color': '#878787',
                        'marker-symbol': rows[i].Location
                    }
                });
                //closed marker

                //('added gray marker at ' + i);
                ////(rows[i].Location);
            }

            else if (percent < 50 && rows[i].Type!='MT') {
                AidStationsGEOJSON.push({
                    // this feature is in the GeoJSON format: see geojson.org
                    // for the full specification
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            rows[i].Longitude, rows[i].Latitude
                        ]
                    },
                    properties: {
                        'title': 'Aid Station ' + rows[i].Location +'<br>New Patients: ' + rows[i].CurrentPatients +'<br>Cumulative Patients: ' + rows[i].CumulativePatients,
                        'marker-size': "small",
                        'marker-color': '#009933',
                        'marker-symbol': rows[i].Location
                    }
                });
                //create green marker

                //('added green marker at ' + i)
                ////(rows[i].Location);
                ////(rows[i].Location.substr(0,2));
            }
            //debugger;
            else if (percent < 90 && rows[i].Type!='MT') {
                AidStationsGEOJSON.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            rows[i].Longitude, rows[i].Latitude
                        ]
                    },
                    properties: {
                        'title': 'Aid Station ' + rows[i].Location +'<br>New Patients: ' + rows[i].CurrentPatients +'<br>Cumulative Patients: ' + rows[i].CumulativePatients,
                        'marker-size': "small",
                        'marker-color': '#009933',
                        'marker-symbol': rows[i].Location
                    }
                });
                //create yellow marker

                //('added yellow marker at ' + i)

                /*/create yellow marker
                var marker = new L.marker([rows[i].Latitude,rows[i].Longitude],
                    {icon: yellowMarker})
                .addTo(map); 
                ////('added yellow marker at '+i)
                */
            }
            else if (rows[i].Type!='MT'){
                AidStationsGEOJSON.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            rows[i].Longitude, rows[i].Latitude
                        ]
                    },
                    properties: {
                        'title': 'Aid Station ' + rows[i].Location +'<br>New Patients: ' + rows[i].CurrentPatients +'<br>Cumulative Patients: ' + rows[i].CumulativePatients,
                        'marker-size': "small",
                        'marker-color': '#009933',
                        'marker-symbol': rows[i].Location
                    }
                });
                //create red marker

                //('added red marker at ' + i)
            }
            
            ASFL.clearLayers();
            //clear
            //ASFL.setGeoJSON({});
            //set new geojson data
            ASFL.setGeoJSON(AidStationsGEOJSON);
            //ASFL.clearLayers();
            //debugger;
        };

        //if (update==0){
          //only add medical tent if it's the first time
          //add medical tent markers (only show Balbo, not both Balbo/Pod) 
      ////(rows[i].Longitude);
      /*var i = 1
      var class_size = "fa-1x";
     
      L.marker([rows[i].Latitude, rows[i].Longitude], {
        icon: L.divIcon({
          // specify a class name that we can refer to in styles, as we
          // do above.
          className: 'fa-icon',
          // html here defines what goes in the div created for each marker
          html: '<i class="fa fa-plus-square '+class_size+'" style = "color:#c12c2c"></i>',

          // and the marker width and height
          iconSize: [60, 60]
        })
      }).addTo(ASFL);*/
    });
}

function runnerTracking(){
      //plot runner tracking on map
      var runLoc = [];
      d3.csv("data/gps.csv", function(d) {
          // Add a LatLng object to each item in the dataset
          runLoc = d;
          return {
              latLWM: +d.LeadWheelchairMaleLat,
              longLWM: +d.LeadWheelchairMaleLong,
              latLWF: +d.LeadWheelchairFemaleLat,
              longLWF: +d.LeadWheelchairFemaleLong,
              latFW: +d.FinalWheelchairLat,
              longFW:+d.FinalWheelchairLong,
              
              latLM: +d.LeadMaleLat,
              longLM: +d.LeadMaleLong,
              latLF: +d.LeadFemaleLat,
              longLF: +d.LeadFemaleLong,
              latT: +d.TurtleLat,
              longT: +d.TurtleLong,
              
              lat350: +d.pace350Lat,
              long350: +d.pace350Long,
              lat355: +d.pace355Lat,
              long355: +d.pace355Long,
              lat425: +d.pace425Lat,
              long425: +d.pace425Long,
              lat430: +d.pace430Lat,
              long430: +d.pace430Long,
              lat500: +d.pace500Lat,
              long500: +d.pace500Long,
              lat510: +d.pace510Lat,
              long510: +d.pace510Long
          };
      
      }, function(error, rows) {
      
        ////(rows);
        //(rows);
        //debugger;
        geojson[0]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [rows[0].longLWM,rows[0].latLWM]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "LWh", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[1]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [rows[0].longLWF,rows[0].latLWF]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-sf", // class name to style
            "html": "LWF", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[2]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [rows[0].longFW,rows[0].latFW]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-sf", // class name to style
            "html": "FWh", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[3]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          
"coordinates": [rows[0].longLM,rows[0].latLM]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-sf", // class name to style
            "html": "LM", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
            
          }
        }
        };
        geojson[4]=
        {
        "type": "Feature",
        "geometry": {
          
"type": "Point",
          "coordinates": [rows[0].longLF,rows[0].latLF]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "LF", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[5]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [rows[0].longT,rows[0].latT]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "T", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[6]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [rows[0].long350,rows[0].lat350]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "LWk", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[7]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [rows[0].long355,rows[0].lat355]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "FWk", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
         geojson[8]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [10+rows[0].long425,rows[0].lat425]
        
},
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "BELL", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[9]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [10+rows[0].long430,10+rows[0].lat430]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "BELL", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[10]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [10+rows[0].long500,rows[0].lat500]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "5:00", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        geojson[11]=
        {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [10+rows[0].long510,10+rows[0].lat510]
        },
        "properties": {
          "icon": {
            "className": "my-icon icon-dc", // class name to style
            "html": "5:10", // add content inside the marker
            "iconSize": null // size of icon, use null to set the size in CSS
          }
        }
        };
        
        trackingLayer.clearLayers();
        trackingLayer.setGeoJSON([]);
        trackingLayer.setGeoJSON(geojson);
        
      });
      
    ////('here is the geojson');
    ////(geojson);
    trackingLayer.on('layeradd', function(e) {
      var marker = e.layer,
          feature = marker.feature;
      marker.setIcon(L.divIcon(feature.properties.icon));
    });
};


function plotMiles(){
  
  MileMarkers = []
  MileMarkers.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            -87.625383, 41.891722
                        ]
                    },
                    properties: {
                        'title': 'Mile Marker',
                        'marker-size': 'small',
                        'marker-color': '#520063',
                        'marker-symbol': 1
                    }
                });
  
    MileMarkers.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            -87.62768,41.878193
                        ]
                    },
                    properties: {
                        'title': 'Mile Marker',
                        'marker-size': 'small',
                        'marker-color': '#520063',
                        'marker-symbol': 2
                    }
                });

    MileMarkers.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            -87.6353391,41.8825979
                        ]
                    },
                    properties: {
                        'title': 'Mile Marker',
                        'marker-size': 'small',
                        'marker-color': '#520063',
                        'marker-symbol': 3
                    }
                });
                
        MileMarkers.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            -87.626839,41.8745101
                        ]
                    },
                    properties: {
                        'title': 'Mile Marker',
                        'marker-size': 'small',
                        'marker-color': '#520063',
                        'marker-symbol': 4
                    }
                });
                
                
                
  MM.setGeoJSON(MileMarkers);
  
  
}


L.mapbox.accessToken = 'pk.eyJ1IjoiYnBleW5ldHRpIiwiYSI6IjNjMjQ0NTM4MTE0MmM0ODkwYTA0Mjg0NGYyZGM4MzM5In0.K96jFRdiKaEPadA1IxKoQw';

//if index or normal: 
if (window.innerWidth > 1900){
  var map = L.mapbox.map('map', 'bpeynetti.ed1c07fe')
      .setView([41.8795, -87.622], 15); //OLD for both desktop/vertical is .setView([41.8955, -87.648], 13);
  var size = "medium";
}
else {
  //if desktop or desktop2:
  var map = L.mapbox.map('map', 'bpeynetti.ed1c07fe')
      .setView([41.8795, -87.62], 14);
  var size = "small";
}

//41.896918, -87.626818

//properties of the map
map.touchZoom.disable();
map.doubleClickZoom.disable();
// map.scrollWheelZoom.disable();

//create 3 layers minumum
var trackingLayer = L.mapbox.featureLayer().addTo(map);
var pathsLayer = L.mapbox.featureLayer().addTo(map);
var ASLayer = L.mapbox.featureLayer().addTo(map);

//create placeholder for the pacers as geojson
var geojson = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
    {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
    {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.031952,38.913184]
    },
    "properties": {
      "icon": {
        "className": "my-icon icon-dc", // class name to style
        "html": "&#9733;", // add content inside the marker
        "iconSize": null // size of icon, use null to set the size in CSS
      }
    }
  },
];

var coords = [];
var polyline;
var started=0;

//var layerGroup = L.LayerGroup([]);

var polylineArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var coordsArr = [];
//now try to create slices of 2 by 2
var PolylineStyling = generateLines();
var WalkPolylineStyling = generateWalkLines()


ASFL = L.mapbox.featureLayer().addTo(map);
MM = L.mapbox.featureLayer().addTo(map);

//plot aid station markers
plotAS(0);
runnerTracking();
plotMiles();
