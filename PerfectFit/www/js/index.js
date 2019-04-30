/*
* index.js
* Put your JavaScript in here
*/

"use strict";

/*===========================*/
/* put global variables here */
/*===========================*/
var takeSelfieButton
var selfieStatus
var selfieImage 

var takePhotoButton
var photoStatus    
var photoImage 

var cameraOptions  
var options

var yourBust
var yourWaist
var yourHips
var yourInseam
var itemBust
var itemWaist
var itemHips
var itemInseam
var itemStyle 
var resultStatement      

var mysqlServerElem;
var mysqlUsernameElem;
var mysqlPasswordElem;
var mysqlDatabaseElem;

var mysqlServerSetting;
var mysqlUsernameSetting;
var mysqlPasswordSetting;
var mysqlDatabaseSetting;

/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){

    
    mysqlUsernameElem = document.getElementById('mysqlUsernameId');    
    mysqlPasswordElem = document.getElementById('mysqlPasswordId');
    
    StatusBar.overlaysWebView(false); // force ios to show status bar
    
	showHomeTab();

    takePhotoButton = document.getElementById('takePhotoButtonId')
    photoStatus     = document.getElementById('photoStatusId')
    photoImage      = document.getElementById('photoImageId')
    cameraOptions   = document.getElementById('cameraOptionsId')
    takeSelfieButton = document.getElementById('takeSelfieButtonId');
    selfieStatus = document.getElementById('selfieStatusId');
    selfieImage = document.getElementById('selfieImageId');

    options         = {
            quality: 100,
            destinationType:    Camera.DestinationType.FILE_URI,
            sourceType:         Camera.PictureSourceType.CAMERA,
            correctOrientation: true, 
            mediaType:          Camera.MediaType.PICTURE,
            encodingType:       Camera.EncodingType.JPEG,
            cameraDirection:    Camera.Direction.BACK,
            targetWidth:        400,
            targetHeight:       400        
    }

    // cameraOptions.innerHTML = JSON.stringify(options, null, 2)
    loadSettings()
}

function takeSelfie() {
    navigator.camera.getPicture(selfieSuccess, selfieError, options)
}

function selfieSuccess(imageURI) {
    selfieStatus.innerHTML = "Looking good!";
    selfieImage.src = imageURI
    selfieImage.style.display = "block";
}

function selfieError(errorMessage) {
    selfieStatus.innerHTML = "Failed: " + errorMessage;
}

function takePhoto() {
    navigator.camera.getPicture(photoSuccess, photoError, options)
}

function photoSuccess(imageURI) {
    photoStatus.innerHTML = "Good choice!";
    photoImage.src = imageURI
    photoImage.style.display = "block";
}

function photoError(errorMessage) {
    photoStatus.innerHTML = "Failed: " + errorMessage;
}

function showHomeTab() {
	document.getElementById('home').click();
}

function displayResults() {
    fakeMeasurementAPI(photoImage);
    document.getElementById('yourBust').innerHTML = yourBust;
    document.getElementById('yourWaist').innerHTML = yourWaist;
    document.getElementById('yourHips').innerHTML = yourHips;
    document.getElementById('yourInseam').innerHTML = yourInseam;
    document.getElementById('bustResult').innerHTML = itemBust;
    document.getElementById('waistResult').innerHTML = itemWaist;
    document.getElementById('hipsResult').innerHTML = itemHips;
    document.getElementById('inseamResult').innerHTML = itemInseam;
    document.getElementById('styleResult').innerHTML = itemStyle;
    document.getElementById('resultStatement').innerHTML = resultStatement;

}

function fakeMeasurementAPI(clothingPhoto, personPhoto)
{
    yourBust = "45in";
    yourWaist = "28in";
    yourHips = "32in";
    yourInseam = "32in";


    itemBust = "45in";
    itemWaist = "28in";
    itemHips = "32in";
    itemInseam = "32in";
    itemStyle = "95%";

    resultStatement = "It's a perfect fit!";

}

function showTab(event, tabName) {
    // Declare all variables
    var i, tabContentElems, tabLinkElems;

    // Get all elements with class="tabContent" and hide them
    tabContentElems = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElems.length; i++) {
        tabContentElems[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove class "active"
    tabLinkElems = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElems.length; i++) {
        tabLinkElems[i].className = 
        	tabLinkElems[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}		

function loadSettings() {
    mysqlServerElem.value   = 'sql.wpc-is.online';
    mysqlUsernameElem.value = localStorage.mysqlUsernameSetting || 'ddang';
    mysqlPasswordElem.value = localStorage.mysqlPasswordSetting || 'ddan8659';
    mysqlDatabaseElem.value = localStorage.mysqlDatabaseSetting || 'db_test_dang';
}

function saveSettings() {
    var checkBox = document.getElementById("myCheck");
    if(checkBox.checked == true)
    localStorage.mysqlUsernameSetting = mysqlUsernameElem.value;
    localStorage.mysqlPasswordSetting = mysqlPasswordElem.value;
    
}

function login() {
        MySql.Execute(
            "52.42.131.91",            // mySQL server
            "ddang",                        // login name
            "ddan8659",        // login password
            "db_test_ddang",        // database to use
                                            // SQL query string
            "Select User, Password From Login WHERE User = 'mysqlUsernameElem.value' AND Password = 'mysqlPasswordElem.value'",
            function (data) {
                processTestResult(data);
            }
        );
}

function processTestResult(queryReturned) {
    if (!queryReturned.Success) {
        document.getElementById("status").innerHTML = queryReturned.Error;
    } else {
        document.getElementById("status").innerHTML = "Login!";
    }
}
// function toggle(icon, content) {
//             var currentTransform = icon.style.transform;
//             console.log(currentTransform);
//             let nextTransform = "";
//             let showOrHide = "";

//             if (currentTransform === "rotate(0deg)" || currentTransform === ""){
//                 nextTransform="rotate(90deg)";
//                 showOrHide = "block";
//             } else {
//                 nextTransform="rotate(0deg)";           
//                 showOrHide = "none";
//             }

//             icon.style.transform=nextTransform;
//             document.getElementById(content).style.display=showOrHide;
//         }
