


function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapId: "1df09633b5c319c7",
    center: { lat: 35.457, lng: 139.395 },
    zoom: 12,
  });
   // Load the stores GeoJSON onto the map.
   map.data.loadGeoJson('stores.json', {idPropertyName: 'storeid'});
 
 
   map.data.setStyle((feature) => {
     return {
       icon: {
         url: `img/icon_${feature.getProperty('category')}.png`,
         scaledSize: new google.maps.Size(32, 32),
       },
     };
   });
 
 
   const apiKey = 'AIzaSyAOt_zaWcDh2x8yNprbwL2qvnRjzOrPaq0';
   const infoWindow = new google.maps.InfoWindow();
 
   // Show the information for a store when its marker is clicked.
   map.data.addListener('click', (event) => {
     const category = event.feature.getProperty('category');
     const name = event.feature.getProperty('name');
     const description = event.feature.getProperty('description');
     const hours = event.feature.getProperty('hours');
     const main_site = event.feature.getProperty('main_site');
     const sub_site = event.feature.getProperty('sub_site');
     const closed = event.feature.getProperty('closed');
     const ido = event.feature.getProperty('ido');
     const keido = event.feature.getProperty('keido');
     const position = event.feature.getGeometry().get();
     const content = `
     <img style="float:left; width:50px; margin-top:20px" src="img/logo_${category}.png">
     <div style="margin-left:20px; margin-bottom:20px;">
       <h2>${name}</h2><p>${description}</p>
       <p><b>Open:</b> ${hours} <br/> <b>Closed:</b>  ${closed}<br/>  <a href="${main_site}" target="_blank"><b>公式サイト</b></a><br/> <a href="${sub_site}" target="_blank"><b>参考サイト</b></a><br/>
       <a href="yjcarnavi://navi/select?lat=${ido}&lon=${keido}&name=${name}"><b>車で向かう（Yahooカーナビ）</b></a><br/>
       <a href="https://www.google.com/maps/dir/?api=1&destination=${ido},${keido}&travelmode=walking" target="_blank"><b>徒歩で向かう（GoogleMap）</b></a><br/>
       </p>

     </div>
     `;
 
     infoWindow.setContent(content);
     infoWindow.setPosition(position);
     infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
     infoWindow.open(map);
   });
 }
 
 
 
 
 window.initMap = initMap;