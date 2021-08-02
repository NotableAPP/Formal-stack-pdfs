$=(str)=>{return document.querySelector(str);}
$all=(str)=>{return document.querySelectorAll(str);}
var lastTouchY = 0;
var navUp = false;
var firstTouchY = 0;
var swipeUpDisa = false;
window.addEventListener("touchstart",e=>{
    				firstTouchY=e.touches[0].clientY;
    })
window.addEventListener("touchmove",e=>{
    
    window.addEventListener("touchend",c=>{
    
				if(lastTouchY-firstTouchY<=-30){
								
								navUp=false;
								OptUi();								
				}else if(firstTouchY-lastTouchY<=-30){
				    navUp=true;
								OptUi();
				}
				})
				lastTouchY=e.touches[0].pageY;
});
window.addEventListener("keyup",c=>{

	if(c.keyCode==38){
					
					navUp=false;
					OptUi();								
	}else if(c.keyCode==40){
		navUp=true;
					OptUi();
	}
})
function OptUi() {
     if(navUp==false&&swipeUpDisa==false){
					$("div.page").style.height="calc(100vh - 30px)"
		 	$("div.app").style.top="-60px"
				$("div.page").style.marginBottom="20px"
				$("div.menu-nav-bar").style.borderRadius="0"
				$("div.page").classList.remove("box")
				navUp=true;
				}else{
				if(swipeUpDisa==false){
				navUp=false;
				$("div.page").style.height=""
		 	$("div.app").style.top=""
				$("div.page").style.marginBottom=""
				$("div.page").classList.add("box")
			 $("div.menu-nav-bar").style.borderRadius=""		
			 $("div.page").style.boxShadow=""	
			 }
				}
}
function readTextFile(file , call)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                call(allText);
            }
        }
    }
    rawFile.send(null);
}

function navigate(elem,call) {
if($(".active-tab")) {
				 $(".active-tab").classList.remove("active-tab");
}
 
  $all(".pg-but").forEach(e=>{
	  e.disabled=true;
  })
    $("div.page").style.marginLeft="110vw"
    $("div.loader").style.opacity="1";
    swipeUpDisa=true;
				let matterSRC = elem.dataset.src;
				try{
				readTextFile(matterSRC,e=>{
								
								setTimeout(t=>{ 
									    elem.classList.add("active-tab")
										$all(".pg-but").forEach(e=>{
											e.disabled=false;
										})
										
								        $("div.page").innerHTML=e;
										$("div.page").style.marginLeft="";
										$("div.loader").style.opacity="";
										call();
										},1200);
								swipeUpDisa=false;
				});
				}catch(e){
								$("#toast").MaterialSnackbar.showSnackbar({
												message:"Error to open this tab."
								});
				}
}
if(!localStorage.mode){
				localStorage.mode="light";
}
var toggleDarkMode=(val,callBy)=>{
				if(val==true||(localStorage.mode=="dark"&&callBy=="page")){
				localStorage.mode="dark"
				if($("body.light")){
								$("body").classList.remove("light");
								}
								$("body").classList.add("dark")
								$("meta[name=ted-globalmode]").content="dark";
				}else{
				localStorage.mode="light";
				if($("body.dark")){
								$("body").classList.remove("dark");
								}
								$("body").classList.add("light");
								$("meta[name=ted-globalmode]").content="light";
				}
}
var syncSettings = () =>{
				if(localStorage.mode=="dark"){
								$("#darkmodeinp").checked=true;
				}
}