function changeFrame(url, doc) {
    const frame = doc.querySelector("div[class=\"ddbc-character-avatar__frame\"]");
    var src = "\""+ url + "\"";
    var img = "<img src=" + src + "class=\"ddbc-character-avatar__frame\">";
    try {
        frame.style = "";
        frame.classList.remove("ddbc-character-avatar__frame")
    } catch(e) {
        
    }
    frame.innerHTML = img;
    console.log(frame);
}

// var link = "https://i.imgur.com/sCXlJ7A.png";

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if(c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if(getCookie("framelink") != null) link = getCookie("framelink");

// import {link} from './content-script.js';
// link = 1;

var checkExist = setInterval(function() {
    if(link == undefined || link == null || link == "") { clearInterval(checkExist); return; }
    else if (document.querySelector('div[class=\"ddbc-character-avatar__frame\"]')) {
        changeFrame(link, document);
        clearInterval(checkExist);
    }
 }, 100);

 window.onresize = function() {
    let iterations = 0;
    var verif = setInterval(function() {
        if(link == undefined || link == null || link == "") { clearInterval(verif); return; }
        else if (document.querySelector('div[class=\"ddbc-character-avatar__frame\"]')) {
            changeFrame(link, document);
            clearInterval(verif);
        } iterations++;
        if(iterations > 20) clearInterval(verif);
     }, 100);
 }