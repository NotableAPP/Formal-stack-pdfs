$ = (str) => {
	return document.querySelector(str);
}
$all = (str) => {
	return document.querySelectorAll(str);
}
var lastTouchY = 0;
var navUp = false;
var firstTouchY = 0;
var swipeUpDisa = false;
window.addEventListener("touchstart", e => {
	firstTouchY = e.touches[0].clientY;
})
window.addEventListener("touchmove", e => {

	window.addEventListener("touchend", c => {

		if (lastTouchY - firstTouchY <= -30) {

			navUp = false;
			OptUi();
		} else if (firstTouchY - lastTouchY <= -30) {
			navUp = true;
			OptUi();
		}
	})
	lastTouchY = e.touches[0].pageY;
});
window.addEventListener("keyup", c => {

	if (c.keyCode == 38) {

		navUp = false;
		OptUi();
	} else if (c.keyCode == 40) {
		navUp = true;
		OptUi();
	}
})

function OptUi() {
	if (navUp == false && swipeUpDisa == false) {
		$("div.page").style.height = "calc(100vh - 30px)"

		$("div.app").style.top = "-61px"
		$("div.page").style.marginBottom = "20px"
		$("div.menu-nav-bar").style.borderRadius = "0"
		$("div.page").classList.remove("box")
		navUp = true;
	} else {
		if (swipeUpDisa == false) {
			navUp = false;
			$("div.page").style.height = ""
			$("div.app").style.top = ""
			$("div.page").style.marginBottom = ""
			$("div.page").classList.add("box")
			$("div.menu-nav-bar").style.borderRadius = ""
			$("div.page").style.boxShadow = ""
		}
	}
}

function readTextFile(file, call) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				call(allText);
			}
		}
	}
	rawFile.send(null);
}

function navigate(elem, call) {
	navUp = false;
	OptUi();
	if ($(".active-tab")) {
		$(".active-tab").classList.remove("active-tab");
	}

	$all(".pg-but").forEach(e => {
		e.disabled = true;
	})
	$("div.page").style.marginLeft = "110vw"
	$("div.loader").style.opacity = "1";
	swipeUpDisa = true;
	let matterSRC = elem.dataset.src;
	try {
		readTextFile(matterSRC, e => {
			setTimeout(t => {
				elem.classList.add("active-tab")
				$all(".pg-but").forEach(e => {
					e.disabled = false;
				})

				$("div.page").innerHTML = e;
				$("div.page").style.marginLeft = "";
				$("div.loader").style.opacity = "";
				swipeUpDisa = false;
				call();
				navUp = true;
				OptUi();

			}, 1200);

		});
	} catch (e) {
		$("#toast").MaterialSnackbar.showSnackbar({
			message: "Error to open this tab."
		});
	}
}
if (!localStorage.mode) {
	localStorage.mode = "light";
}
var toggleDarkMode = (val, callBy) => {
	if (val == true || (localStorage.mode == "dark" && callBy == "page")) {
		localStorage.mode = "dark"
		if ($("body.light")) {
			$("body").classList.remove("light");
		}
		$("body").classList.add("dark")
		$("meta[name=ted-globalmode]").content = "dark";
	} else {
		localStorage.mode = "light";
		if ($("body.dark")) {
			$("body").classList.remove("dark");
		}
		$("body").classList.add("light");
		$("meta[name=ted-globalmode]").content = "light";
	}
}
var syncSettings = () => {
	if (localStorage.mode == "dark") {
		$("#darkmodeinp").checked = true;
	}
}
var shareOurApp = () => {
	Ted().alert({
		title: "share via",
		content: `<div class="via-share"><a target="_blank" href="https://wa.me/?text=Hey+there+%2C%0D%0Atry+the+Awesome+serverless+pdf+maker+app+which+makes+the+pdf+faster+than+rocket...%0D%0A%0D%0Ahttps%3A%2F%2Fformal-stack.netlify.app%2F%3Ftype%3Dshared_by_user%0D%0A%0D%0AClick+on+the+above+linkto+get+started" data-action="share/whatsapp/share"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 24 24" width="100px" fill="#128C7E"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg></a><a href="https://telegram.me/share/url?url=https://formal-stack.netlify.app/?share=true&text=Hey+there+%2C%0D%0Atry+the+Awesome+serverless+pdf+maker+app+which+makes+the+pdf+faster+than+rocket...%0D%0A%0D%0Ahttps%3A%2F%2Fformal-stack.netlify.app%2F%3Ftype%3Dshared_by_user%0D%0A%0D%0AClick+on+the+above+linkto+get+started"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 24 24" width="100px" fill="#0088cc"><g><rect fill="none" height="24" width="24" y="0"/></g><g><path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2z M16.64,8.8 c-0.15,1.58-0.8,5.42-1.13,7.19c-0.14,0.75-0.42,1-0.68,1.03c-0.58,0.05-1.02-0.38-1.58-0.75c-0.88-0.58-1.38-0.94-2.23-1.5 c-0.99-0.65-0.35-1.01,0.22-1.59c0.15-0.15,2.71-2.48,2.76-2.69c0.01-0.03,0.01-0.12-0.05-0.18c-0.06-0.05-0.14-0.03-0.21-0.02 c-0.09,0.02-1.49,0.95-4.22,2.79c-0.4,0.27-0.76,0.41-1.08,0.4c-0.36-0.01-1.04-0.2-1.55-0.37c-0.63-0.2-1.12-0.31-1.08-0.66 c0.02-0.18,0.27-0.36,0.74-0.55c2.92-1.27,4.86-2.11,5.83-2.51c2.78-1.16,3.35-1.36,3.73-1.36c0.08,0,0.27,0.02,0.39,0.12 c0.1,0.08,0.13,0.19,0.14,0.27C16.63,8.48,16.65,8.66,16.64,8.8z"/></g></svg></a></div>`,
		html: true,
		btns: [{
			val: "Other apps",
			fun: sh => {
				navigator.share({
					url: "https://formal-stack.netlify.app/?share=true",
					text: "Hey there , \n try the awesome app which works without server and it's faster than rocket \n try it out.",
					title: "share formal stack"
				})
			}
		}]
	})
}
