window.onload = function() {
    let length = store.get("length")
    if (length == undefined){
        document.getElementById("record").innerHTML = "<h1 class='error'>記録がありません</h1>"
        return;
    }
    
    var r;
    var html_text = "";
    for (let i=0; i<length; i++){
        r = store.get(i);

        html_text += "<h1 class='date'>" + r.date + "</h1>";
        html_text += "<h3 class='data'>" + r.start + " ~ " + r.finish + "</h3>";
        html_text += "<h3 class='data'>" + r.time + "</h3>";
        html_text += "<h3 class='data'>" + r.distance + "</h3>";
        html_text += "<h3 class='data'>" + r.speed + "</h3>";
    }

    document.getElementById("record").innerHTML = html_text;

};
