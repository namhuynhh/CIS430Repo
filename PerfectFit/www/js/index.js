/*
* index.js
* Put your JavaScript in here
*/

"use strict";

/*===========================*/
/* put global variables here */
/*===========================*/

var takePhotoButton
var photoStatus    
var photoImage     
var cameraOptions  
var imageFilename
var options        

/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){

    StatusBar.overlaysWebView(false); // force ios to show status bar
	showHomeTab();

    takePhotoButton = document.getElementById('takePhotoButtonId')
    photoStatus     = document.getElementById('photoStatusId')
    photoImage      = document.getElementById('photoImageId')
    imageFilename   = document.getElementById('imageFilenameId')
    cameraOptions   = document.getElementById('cameraOptionsId')

    options         = {
            quality: 100,
            destinationType:    Camera.DestinationType.FILE_URI,
            sourceType:         Camera.PictureSourceType.CAMERA,
            correctOrientation: true, 
            mediaType:          Camera.MediaType.PICTURE,
            encodingType:       Camera.EncodingType.JPEG,
            cameraDirection:    Camera.Direction.BACK,
            targetWidth:        300,
            targetHeight:       400        
    }

    cameraOptions.innerHTML = JSON.stringify(options, null, 2)
}

function takePhoto() {
    navigator.camera.getPicture(photoSuccess, photoError, options)
}

function photoSuccess(imageURI) {
    photoStatus.innerHTML = "Success!";
    imageFilename.innerHTML = imageURI;
    photoImage.src = imageURI
}

function photoError(errorMessage) {
    photoStatus.innerHTML = "Failed: " + errorMessage;
    imageFilename.innerHTML = "";
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
