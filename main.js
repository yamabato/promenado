//5秒に一回地図
//AIzaSyAl0b_nXKAUV2IDvkZl0qXdH5CaO1X6k4M
var watch_id;
var pos_list = [];
var distance = 0;
var start_time = 0;
var time = 0;
var count_id;
var map;
var point = [0, 0];

let speed_digit = 10 ** 2;
let distance_digit = 1 ** 3;

function map_init(){
    map = L.map('map', { zoomControl: false });

    L.control.scale({ maxWidth: 200, position: 'bottomright', imperial: false }).addTo(map);
    L.control.zoom({ position: 'bottomleft' }).addTo(map);
}     

function update_map(){
    if (pos_list.length == 0){
        return;
    }

    if (pos_list.length == 1){
        point = pos_list[pos_list.length-1];
        map.setView(point, 30);
    }

    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
      attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);

    console.log(pos_list);

    for (point of pos_list){
        L.marker(point,{title:"ポイント1",draggable:false}).addTo(map);
    }
    L.polyline(pos_list, { color: 'blue', weight: 5 }).addTo(map);
}

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
  return Math.round(dis * distance_digit) / distance_digit
}

function count(){
    time++;
    var time_text = "<h3 class=time>";
    var now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    time_text += hours + "時";
    time_text += minutes + "分";
    time_text += seconds + "秒";
    time_text += "</h3>";

    document.getElementById("time").innerHTML = time_text;
}

function sec2str(sec){
    let h = Math.floor(sec / 3600);
    let m = Math.floor(sec / 60) % 60;
    let s = sec % 60;

    return [h, m, s];
}

function m2str(m){
    let kilo_meter = Math.floor(m / 1000);
    let meter = Math.floor(m % 1000);
    return [kilo_meter, meter];
}

function init() {
    watch_id = navigator.geolocation.watchPosition(write, function(e) { alert(e.message); }, {"enableHighAccuracy": true, "timeout": 20000, "maximumAge": 2000});
}

function write(position) {
    var geo_text = "";

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let altitude = position.coords.altitude;
    var date = new Date(position.timestamp);
    var now_time = date.getTime();
    if (start_time == 0){
        start_time = now_time;
    }
    pos_list.push([latitude, longitude]);
    var len = pos_list.length;
    if (len >= 2){
        distance += measure_distance(pos_list[len-2],pos_list[len-1]);
    }
    var d = m2str(distance);
    var elapsed = sec2str(time);
    var speed = Math.round((distance / (time / 3600)) / 1000 * speed_digit) / speed_digit;

    /*
    geo_text += "緯度:" + latitude + "\n";
    geo_text += "経度:" + longitude + "\n";
    geo_text += "高度:" + altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";
    */
    geo_text += "総移動距離:" + d[0] + "km" + d[1] + "m"  + "\n";
    geo_text += "経過時間:" + elapsed[0] + "時間" + elapsed[1] + "分" + elapsed[2] + "秒" + "\n";
    geo_text += "平均速度:" + (speed? speed : 0) + "km/s\n";

    update_map();

    document.getElementById("position_view").innerHTML = geo_text;
}

window.onload = () => {
    map_init();
    init();
    count_id = setInterval(count,1000);
}
