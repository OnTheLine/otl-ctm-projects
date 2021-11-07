$(function() {

  var height = 530;
  var mainContainer = ".mapContainer";
  var selected1 = "Black";
  var selected2 = "White";
  var year = 69;

  var osm = new L.TileLayer('http://a.tiles.mapbox.com/v3/borzechowski.i8ec55c0/{z}/{x}/{y}.png');
  var theLat = 41.46952799999987
  var theZoom = 8;
  if ($(".interactiveContainer").width() < 550) {
    theZoom = 7;
    theLat = 40.86952799999987;
  }
  var map = new L.Map('map', {
    center: new L.LatLng(theLat,-72.264908), 
    zoom: theZoom,
    scrollWheelZoom: false,
    layers: [osm]
  });
  var theTerm = "Hartford";
  var years = ["69","82","87","93","105","112"];
  var featuredTop;


  function style(feature) {
    var theAmount = (feature.properties["white" + year]/feature.properties["total" + year])*100;
    var theOp = (theAmount % 10)*0.3 + 0.7;
    if (theAmount > 0) {
      return {
        fillColor: getColor(theAmount),
        weight: 1,
        opacity: 0.2,
        color: "#333",
        fillOpacity:  theOp
      };  
    } else {
      return {
        fillColor: '#fff',
        weight: 1,
        opacity: 0.1,
        color: "#333",
        fillOpacity:  0
      };                    
    }

  }


  var geojson;
  makeMap(style);

  function makeMap(theStyle) {
    geojson = L.geoJson(cityData, {
      style: theStyle,
      onEachFeature: onEachFeature
    }).addTo(map);  
  }






  function highlightFeature(e) {
   var layer = e.target;

   layer.setStyle({
    weight: 4,
    color: '#000',
    opacity: 1
  });

   if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToBack();
  }
  info.update(layer.feature.properties);
  makeChart(layer.feature);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
  $(".leaflet-marker-icon, .leaflet-shadow-pane").fadeOut(200);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: highlightFeature
  });

}




function getColor(d) {
  var colors = ['rgb(255,245,235)','rgb(254,230,206)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(241,105,19)','rgb(217,72,1)','rgb(166,54,3)','rgb(127,39,4)','rgb(90,20,0)'];
  colors.reverse();
  if (d > 97) { 
    return 'rgb(255,255,255)'; 
  } else { 
    return d > 90  ? colors[9] :
    d >  80 ? colors[8] :
    d > 70   ? colors[7] :
    d > 60   ? colors[6] :
    d > 50  ? colors[5] :
    d > 40   ? colors[4] :
    d > 30   ? colors[3] :
    d > 20   ? colors[2] :
    d > 10  ? colors[1] :
    colors[0];
  }
}

$(".toolItem").click(function() {
  $(".toolItem").removeClass("selected");
  $(this).addClass("selected");
  year = $(this).attr("rel");
  geojson.setStyle(style);
  if (theTerm != "") {
   makePoly(theTerm);
 }
});

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  // var winName = 
  // this._div.innerHTML = (props ? '<div class="townName"><span id="townName">' + props.district.toProperCase() + '</span></div>' : '<div class="townName faded searched">Hover over states</div>') + '</span><div class="labelItem"><div class="rightLabel">White Pct.</div><span id="kindPct">' + (props ? checkNull(props["white" + year]/props["total" + year]*100,true) : '--') + '</span></div><div class="labelItem"><div class="rightLabel">Minority Pct.</div><span id="kindPct2">' + (props ?    checkNull( (1-(props["white" + year]/props["total" + year]))*100,true) : '--') + '</span></div><div class="labelItem"><div class="rightLabel">White Num</div><span id="kindPct3">' + (props ? comma(checkNull(props["white" + year],false)) : '--') + '</span></div><div class="labelItem"><div class="rightLabel">Minority Num</div><span id="kindPct4">' + (props ? comma(checkNull(props["total" + year] - props["white" + year],false)) : '--') + '</span></div>' ;
  var winName = 
  this._div.innerHTML = (props ? '' : '') + '</span><div class="labelItem"><div class="rightLabel">White Pct.</div><span id="kindPct">' + (props ? checkNull(props["white" + year]/props["total" + year]*100,true) : '--') + '</span></div><div class="labelItem"><div class="rightLabel">Minority Pct.</div><span id="kindPct2">' + (props ?    checkNull( (1-(props["white" + year]/props["total" + year]))*100,true) : '--') + '</span></div><div class="labelItem"><div class="rightLabel">White Num</div><span id="kindPct3">' + (props ? comma(checkNull(props["white" + year],false)) : '--') + '</span></div><div class="labelItem"><div class="rightLabel">Minority Num</div><span id="kindPct4">' + (props ? comma(checkNull(props["total" + year] - props["white" + year],false)) : '--') + '</span></div>' ;
};

info.addTo(map);


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};



function checkNull(val,pct) {
  if (val > -99999999999) {
    if (pct) {
      return val = Math.round(val*10)/10 + "%";
    } else {
      return val = Math.round(val*10)/10;
    }
  } else {
    return "No data";
  }
}


function checkThePct(a) {
  if (a > -1) {
    return Math.round(a*1000)/10 + "%";  
  } else {
    return "--";
  }
}


function comma(val){
  num = val;
  val = Math.round(val);
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  if (val == "-") {
    return val;
  } else if (num < 0) {
    return "(" + val.replace("-","")+")";
  } else {
    return "" + val;
  }
}

function makeNum(num1, num2) {
  return Math.round(num1/num2*1000)/10;
}


$(".searchButton").click(function() {
 $(".leaflet-marker-icon, .leaflet-shadow-pane").fadeOut(200);
 theTerm = $("#search").val();
 makePoly(theTerm);
});

$("#search").keyup(function(e) {
  if(e.keyCode == 13) {
    $(".searchButton").click();
  }
});

function makePoly(zip) {
  var correct;
  var found = false;
  for (i in cityData.features) {
    if ( (cityData.features[i].properties.district).toLowerCase() == zip.toLowerCase() ) {
      correct = cityData.features[i];
      found = true;
    }
  }

  if (!found) {
    $(".error").html("No data available").fadeIn(200);
  } else {
    $(".error").fadeOut(200);
    $(".townName").html(correct.properties.district);
    $("#kindPct").html( checkNull(makeNum(correct.properties["white" + year],correct.properties["total" + year]),true));
    $("#kindPct2").html(checkNull(100-makeNum(correct.properties["white" + year],correct.properties["total" + year]),true));
    $("#kindPct3").html(comma(checkNull(correct.properties["white" + year])));
    $("#kindPct4").html(comma(checkNull(correct.properties["total" + year] - correct.properties["white" + year])));
    var thelat = (correct.geometry.coordinates[0][0][0][1] + correct.geometry.coordinates[0][0][Math.round(correct.geometry.coordinates[0][0].length/2)][1])/2;
    var thelng = (correct.geometry.coordinates[0][0][0][0] + correct.geometry.coordinates[0][0][Math.round(correct.geometry.coordinates[0][0].length/2)][0])/2;
    popup = L.marker([thelat,thelng])
    .addTo(map);
  }
  makeChart(correct);
}
prepChart();
var first = true;
makeChart(cityData.features[143]);
makePoly("Hartford");
function prepChart() {
  for (i in years) {
    var theLeft = (Number(years[i])-69)/43*90+7;
    $("#block" + i).css("left",theLeft + "%");
  }
}

function makeChart(term) {
  var topNum = 0;
  for (i in years) {
    var white = term.properties["white" + years[i].slice(-2)];
    var minority = term.properties["total" + years[i].slice(-2)] - term.properties["white" + years[i].slice(-2)];
    if (white > topNum) {topNum = white;}
    if (minority > topNum) {topNum = minority;}
  }
  $(".dot").hide();
  for (i in years) {
    var white = term.properties["white" + years[i].slice(-2)];
    var minority = term.properties["total" + years[i].slice(-2)] - term.properties["white" + years[i].slice(-2)];
    var theLeft = (Number(years[i])-69)/43*90+7;
    if (term.properties["total" + years[i].slice(-2)] != null && term.properties["white" + years[i].slice(-2)] != null) {
      if (first) {
        var whiteDot = $("<div class='dot whiteDot' id='white" + years[i] + "'></div>").css("bottom",white/topNum*100 + "%").css("left",theLeft + "%");
        var minDot = $("<div class='dot minDot' id='min" + years[i] + "'></div>").css("bottom",minority/topNum*100 + "%").css("left",theLeft + "%");
        $(".mainChart").append(whiteDot).append(minDot);
      } else {
        if (white > 0 && minority > 0) {
          $("#white" + years[i]).css("bottom",white/topNum*100 + "%").show();
          $("#min" + years[i]).css("bottom",minority/topNum*100 + "%").show();
        } else {
          $("#white" + years[i]).fadeOut(200);
          $("#min" + years[i]).fadeOut(200);
        }
      }
    }
  }
  $(".chartName").html(term.properties.district + " (by year)");
  $("#search").val(term.properties.district);
  $("#tick0").html(comma(Math.round(topNum)));
  $("#tick1").html(comma(Math.round(topNum/4*3)));
  $("#tick2").html(comma(Math.round(topNum/2)));
  $("#tick3").html(comma(Math.round(topNum/4)));
  first = false;
  theTerm = term.properties.district;
}

function title(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});     
}

var height = 660;
var mainContainer = ".mapContainer";
shaper();
$(window).resize(function() {
  shaper();
});
function shaper() {
  var top = $(".interactiveContainer").height() - $(mainContainer).height();
  var leftover = height - top;
  $(mainContainer).css("height",leftover + "px");
}
setInterval(function() {
  shaper();
},100);

});