// script to inject in the browser for main extension functionality
// uses cookies to store/load options for custom frame image
var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');

// var link = "https://i.imgur.com/sCXlJ7A.png";
var link;

// function creates a new cookie
function setCookie(name, value, seconds) {
    var expires = "";
    if(seconds > 0) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
        lastExpiresAt = date.toUTCString();
        console.log(name + " should expire at: " + expires);
    } else if(seconds == -1) {
        expires = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } else if(seconds == -2) {
        expires = "; expires=" + lastExpiresAt;
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    if(seconds > 0) console.log("Set cookie " + name + " with values " + name + "=" + (value || "") + expires + "; path=/.");
}

// function returns a cookie's data
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

// function returns true if the cookie exists, false if it doesn't
function cookieExists(name) {
    if(getCookie(name) != null) return true;
    else return false;
}

// function deletes a cookie by setting their expiration date to a time in the past
function delCookie(name) {
    console.log("Deleting cookie " + name + " with value " + getCookie(name) + ".");
    setCookie(name, "", -1);
}

// function to load options from extension
function load_options() {
    
    console.log("Loading options...")
    
    // gets options from storage
    chrome.storage.sync.get({
        frameURL: "https://i.imgur.com/sCXlJ7A.png"
    }, function(items) {

        console.log("Storing options...")
        // stores options in variables
        link = items.frameURL;
        console.log(link, " was discovered in options.");
        
        // deletes options cookie if it already exists
        if(cookieExists("framelink")) { console.log("CookieExists returned true."); delCookie("framelink"); }
        
        // creates new cookie according to options which will last for 60 seconds
        setCookie("framelink", link, "60");
        console.log("Set cookie \"framelink\".");

    });

    console.log("Loaded options.")

}

// load the options
load_options();

// on script load delete
s.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(s);