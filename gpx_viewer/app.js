// 初始化地圖
var map = L.map('map').setView([0, 0], 2);

// 添加 OpenStreetMap 圖層
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// 替換目前的事件監聽器
var gpxUrl = 'gpx/routes.gpx';  // 替換成您的 GPX 檔案的 URL

fetch(gpxUrl)
    .then(response => response.text())
    .then(gpxData => {
        // 使用 DOMParser 解析 GPX 檔案
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(gpxData, 'application/xml');

        // 使用 toGeoJSON 將 GPX 轉換為 GeoJSON
        var geojson = toGeoJSON.gpx(xmlDoc);

        // 創建 GeoJSON 圖層並添加到地圖
        var geojsonLayer = L.geoJSON(geojson);
        geojsonLayer.addTo(map);

        // 調整地圖視角以適應 GPX 軌跡
        map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => console.error('Error fetching the GPX file:', error));
