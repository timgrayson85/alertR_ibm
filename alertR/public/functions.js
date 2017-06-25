﻿var socket = io();

// Emit an event when a user adds an application to their list. 
function addAppEvent(name) {
    socket.emit('add-application', name);
};

// Emit an event when a user subscribes to an application. 
function addSubEvent(name) {
    socket.emit('add-subscription', name);
};

// Raise a critical alert for an applicaiton.
function raiseCriticalAlert(name) {
    socket.emit('critical-alert', name);
};

// Raise a warning alert for an applicaiton.
function raiseWarningAlert(name) {
    socket.emit('warning-alert', name);
};

// Raise a information alert for an applicaiton.
function raiseInfoAlert(name) {
    socket.emit('info-alert', name);
};

// Raise a success alert for an applicaiton.
function raiseSuccessAlert(name) {
    socket.emit('success-alert', name);
};


socket.on('critical-alert-raised', function changeStyle(name) {
    var ul = document.getElementById("mySubs");
    var li = ul.getElementsByTagName('li');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < li.length; ++i) {
        if (li[i].innerText == name) {
            li[i].style.backgroundColor = '#f44336';
        }
    }
});

socket.on('warning-alert-raised', function changeStyle(name) {
    var ul = document.getElementById("mySubs");
    var li = ul.getElementsByTagName('li');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < li.length; ++i) {
        if (li[i].innerText == name) {
            li[i].style.backgroundColor = "#ff9800";
        }
    }
});

socket.on('info-alert-raised', function changeStyle(name) {
    var ul = document.getElementById("mySubs");
    var li = ul.getElementsByTagName('li');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < li.length; ++i) {
        if (li[i].innerText == name) {
            li[i].style.backgroundColor = "#2196F3";
        }
    }
});

socket.on('success-alert-raised', function changeStyle(name) {
    var ul = document.getElementById("mySubs");
    var li = ul.getElementsByTagName('li');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < li.length; ++i) {
        if (li[i].innerText == name) {
            li[i].style.backgroundColor = "#4CAF50";
        }
    }
});



socket.on('subscription-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var ul = document.getElementById("mySubs");
    var items = ul.getElementsByTagName('li');
    var li = document.createElement("li");
    var found = 0;

    // Check if the user is already subscribed before adding this application.
    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].innerText == name) {
                found++;
            }
        }
    }

         if (found > 0) {
             alert('You are already subscribed to ' + name);
        }
         else {
            // Add the application to the list.
            li.appendChild(document.createTextNode(name));
            ul.appendChild(li);
        }
        
});



socket.on('application-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var ul = document.getElementById("myApps");
    var li = document.createElement("li");
    var items = ul.getElementsByTagName('li');
    var button = document.createElement("button");
    var found = 0;
    
    // Check if the user is already subscribed before adding this application.
    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            // Substring required to trim off 'Raise Alert' text.
            if (items[i].innerText.substring(0, name.length) == name) {
                found++;
            }
        }
    }


    if (found > 0) {
        alert('You already have ' + name + ' in your applications');
    }
    else {
        // Add the application to the list.
        button.innerHTML = "Raise Alert";
        li.appendChild(document.createTextNode(name));
        li.addEventListener("click", function () {
            var myWindow = window.open("alertdialog.html?" + name, "", "width=300,height=500");
        })

        li.appendChild(button);
        ul.appendChild(li);
    }
  
});


function searchApps() {
    // Declare variables.
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}