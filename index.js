"use strict";

		function toggle(icon, content) {
			var currentTransform = icon.style.transform;
			console.log(currentTransform);
			let nextTransform = "";
			let showOrHide = "";

			if (currentTransform === "rotate(0deg)" || currentTransform === ""){
				nextTransform="rotate(90deg)";
				showOrHide = "block";
			} else {
				nextTransform="rotate(0deg)";			
				showOrHide = "none";
			}

			icon.style.transform=nextTransform;
			document.getElementById(content).style.display=showOrHide;
		}
