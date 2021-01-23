var watch_id;
var pos_list = [];
var distance = 0;
var start_time = 0;
var count_id;

function measure_distance(pos1, pos2) {
  lat1 = pos1[0];
  lng1 = pos1[1];
  lat2 = pos2[0];
  lng2 = pos2[1];
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  let dis = 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000;
  return Math.round(dis * 1000) / 1000
}

function count(){
    time++;
}

function sec2time(sec){
    let hour = Math.floor(sec / 3600);
    let min = Math.floor(sec / 60);
    let sec = sec % 60;

    return [hour, min, sec];
}

function init() {
    watch_id = navigator.geolocation.watchPosition(write, function(e) { alert(e.message); }, {"enableHighAccuracy": true, "timeout": 20000, "maximumAge": 2000});
}

function write(position) {

    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let altitude = position.coords.altitude;
    var geo_text = "緯度:" + latitude + "\n";
    geo_text += "経度:" + longitude + "\n";
    geo_text += "高度:" + altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";

    var date = new Date(position.timestamp);
    var time = date.getTime();
    if (start_time == 0){
        start_time = date.getTime();
    }

    geo_text += "取得時刻:" + date.toLocaleString() + "\n";

    pos_list.push([latitude, longitude]);
    var len = pos_list.length;
    if (len >= 2){
        distance += measure_distance(pos_list[len-2],pos_list[len-1]);
    }

    geo_text += "総移動距離:" + distance + "m\n";
    var elapsed = sec2str(time - start_time);
    geo_text += "経過時間:" + elapsed[0] + "時間" + elapsed[1] + "分" + elapsed[2] + "秒" + "\n";

    document.getElementById('position_view').innerHTML = geo_text;
    console.log(geo_text);
}

window.onload = () => {
    init();
    count_id = setInterval(count,1000);
}
