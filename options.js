// Saves options to chrome.storage
function save_options() {
    var frameURL = document.getElementById('frameurl').value;
    // set options data
    chrome.storage.sync.set({
        frameURL: frameURL
    }, function() {
        // reveal status to let user know it was saved
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        // hide save button
        var button = document.getElementById('save');
        button.style.display = 'none';
        // update image preview
        document.getElementById('img').src = frameURL;
        // reveal save button and hide status
        setTimeout(function() {
            status.textContent = '';
            button.style.display = 'block';
        }, 750);
    });
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        frameURL: "https://i.imgur.com/sCXlJ7A.png"
    }, function(items) {
        document.getElementById('frameurl').value = items.frameURL; // update input textbox
        document.getElementById('img').src = items.frameURL; // update image preview
    });
}

// when the page is loaded, load the options into the GUI (options.html webpage)
document.addEventListener('DOMContentLoaded', restore_options);
// save options on save button click
document.getElementById('save').addEventListener('click', save_options);