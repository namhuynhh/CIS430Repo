/*
 * index.js
 * Put your JavaScript in here
 */

"use strict";

/*===========================*/
/* put global variables here */
/*===========================*/

var sliderValueRed=0;
var sliderValueGreen=0;
var sliderValueBlue=0;

/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

// put your javascript code here, make sure you reference this with a script 
// at the just before the closing body tag:
// 
//     <script type="text/javascript" src="js/index.js"></script>

function onDeviceReady() {
    StatusBar.overlaysWebView(false); // force ios to show status bar
    showHomeTab();
}

function showHomeTab() {
    document.getElementById('home').click();
}

function showTab(event, tabName) {
    // Declare all variables
    var i, tabContentElems, tabLinkElems;

    // Get all elements with class="tabContent" and hide them
    tabContentElems = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElems.length; i++) {
        tabContentElems[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove the class "active"
    tabLinkElems = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElems.length; i++) {
        tabLinkElems[i].className = 
            tabLinkElems[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

function UpdateDisplay(label, value) {

    var valueString="";
    var rgbStyleString="";
    var hexLabelString="";

    switch(label) {
    case 'redLabel':
        sliderValueRed = value;
        break;
    case 'greenLabel':
        sliderValueGreen = value;
        break;
    case 'blueLabel':
        sliderValueBlue = value;
        break;              
    }

    valueString=LeftPadDecimalString(value, "0", 3);
    document.getElementById(label).innerHTML=valueString;

    rgbStyleString = "#" +
        LeftPadHexString(sliderValueRed,   0, 2) +
        LeftPadHexString(sliderValueGreen, 0, 2) +
        LeftPadHexString(sliderValueBlue,  0, 2);
    var divElem = document.getElementById('Make');
    divElem.style.backgroundColor=rgbStyleString;
    
    hexLabelString = "&nbsp;" + rgbStyleString + "&nbsp;"
    document.getElementById('HexLabel').innerHTML=hexLabelString;
}

function LeftPadDecimalString(string, padChar, length) {

    var resultString = string;

    while (resultString.length < length ) {
        resultString = padChar + resultString;
    }
    return resultString;
}

function LeftPadHexString(num, pad, length) {
    var resultString = Number(num).toString(16).toUpperCase();

    while (resultString.length < length) {
        resultString = pad + resultString;
    }
    return resultString;
}

