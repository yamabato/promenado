var watch_id;
var pos_list;

function init() {
    watch_id = navigator.geolocation.watchPosition(write, function(e) { alert(e.message); }, {"enableHighAccuracy": true, "timeout": 20000, "maximumAge": 2000});
}

function write(position) {

    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    altitude = position.coords.altitude;
    var geo_text = "緯度:" + latitude + "\n";
    geo_text += "経度:" + longitude + "\n";
    geo_text += "高度:" + altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";

    var date = new Date(position.timestamp);

    geo_text += "取得時刻:" + date.toLocaleString() + "\n";

    pos_list.push([latitude, longitude]);

    document.getElementById('position_view').innerHTML = geo_text;
    document.getElementById('position_view').innerHTML = pos_list;
}

init();
