$make = str => document.createElement(str)
var pdfPages = [	];
var watermark ;
readTextFile("assets/watermark64",(text)=>{watermark=text});
function addPdfPage(index,page){

  var impl = $make("div");  impl.style.backgroundImage="url("+page+")";
  impl.classList.add("block");
  impl.dataset.pagesrc=page;
  impl.dataset.index=index;
var img = new Image();

img.onload=e=>{  pdfPages.push({src:page,height:img.height,width:img.width});

}
img.src=page;
  impl.addEventListener("click",e=>{
   let src = e.currentTarget.dataset.pagesrc;
   makeInterfaceCropper(src,e.currentTarget.dataset.index);
  });
  $("#caller_to_cam").remove();
  $("#tray_for_pgs").append(impl);
  var adder = $make("div");
  adder.classList.add("block","adder_to_page_pdf");
  adder.setAttribute("onclick","callCam()");
  $("div.main.block_disp").append(adder);
  adder.id="caller_to_cam"
  adder.style.backgroundSize="50px 50px"

}

callCam = () =>{
$("#uploader").click()
}
function syncCreatePage() {
    var pgl = 0;
				pdfPages.forEach(page=>{
				
								var impl = $make("div");  impl.style.backgroundImage="url("+page.src+")";
		impl.dataset.pagesrc=page.src;
  impl.dataset.index=pgl;
  pgl+=1;
  impl.classList.add("block");
  impl.addEventListener("click",e=>{
   let src = e.currentTarget.dataset.pagesrc;
   makeInterfaceCropper(src,e.currentTarget.dataset.index);
  });
  $("#caller_to_cam").remove();
  $("#tray_for_pgs").append(impl);
  var adder = $make("div");
  adder.classList.add("block","adder_to_page_pdf");
  adder.setAttribute("onclick","callCam()");
  $("div.main.block_disp").append(adder);
  adder.id="caller_to_cam"
  adder.style.backgroundSize="50px 50px"
				});
        
        
}
function uploader(elem){
  console.log("change occured")
            let ind = pdfPages.length||0;
            Object.values(elem.files).forEach(file=>{
				console.log(ind)
            var reader = new FileReader();  
            reader.onloadend = function() {  
              if(reader.result.includes("image/png")||reader.result.includes("image/jpg")||reader.result.includes("image/jpeg")){
                addPdfPage(ind,reader.result);ind++;
			  }else{
				$("#toast").MaterialSnackbar.showSnackbar({
					message:"this file is not supported"+file.name
	            });
			  }
			  
            }  
            reader.readAsDataURL(file);   
            
            });
}

makeInterfaceCropper =(src,index)=>{
  var cropper;
  Ted().alert({
  				title:'crop image',
  				html:true,
  				content:`
  				<img src=${src} style="max-width:70vw; height:auto;" id="cropper-js-impl">
  				`,
  				btns:[
  								{
  										val:"crop and save",
  										fun:e=>{
  	                                             var  img = new Image();
                                                   img.onload=()=>{
													   console.log(index)
  													pdfPages[index].src=cropper.getCroppedCanvas().toDataURL();
                                                    pdfPages[index].height=img.height;pdfPages[index].width=img.width;
  													$("button#pdf-create").click();
  													del(e);};
													img.src=cropper.getCroppedCanvas().toDataURL();
              
  													
  													
  										}
  								}
  				]
  })  
  cropper = new Cropper($("#cropper-js-impl"));
}
window.jsPDF = window.jspdf.jsPDF 

var prerenderPdf=()=>{
				 $(".loader").style.opacity="1";
$(".loader").style.zIndex="500"
setTimeout(renderPdf,100);

}
var renderPdf = () =>{

var doc = new jsPDF("p", "mm", "a4");

				for(let page of pdfPages){		
				     let max = {	h:300,	w:210},height,width;
				     
				     if(max.h<page.height||max.w<page.width){
				     			let h=page.height,w=page.width;
				     			if(h>w){				     							
				     							rat=h/w;
				     							h=max.h;
				     							w=h/rat;
				     			}else if(w>=h){
				     			   rat=w/h;
				     			 			w=max.w;
				     							h=w/rat;
				     			}
				     			height=h,width=w;
				     }
				     
									doc.addImage(page.src,"png",0,0,width,height);
							
								doc.addPage("p","mm","a4");
								
				}
				Ted().alert({
								title:"save as",
								html:true,
								content:`
								<input  type="text" id="name_here" style="width:70vw;border:0;box-shadow:0 0 0 2px #6610f2,0 2px 2px #efe;outline:none;background:transparent;color:var(--txt-c);" oninput="correctIt(this)">
								`,
								btns:[
												{
																val:"save",
																fun:e=>{
																  doc.addImage(watermark,0,0,210,300);
																	 doc.save($("#name_here").value+"-fs.pdf");
																	 sessionStorage.currName=$("#name_here").value+"-fs.pdf";
																	 $(".loader").style.opacity="";
$(".loader").style.zIndex="";
                
                 del(e);
                 pdfPages=[];
                 $("button#pdf-create").click();
																}
												},{
																val:"close",
																fun:e=>{
																																																				 $(".loader").style.opacity="";
$(".loader").style.zIndex="";

del(e);					


																}
												}
								],
								closeBtn:false
				})

}
function correctIt(obj){
				let notAllowed = `*"?/* .'\[]:;|,`;
		  notAllowed =		notAllowed.split("");
		  for(let chara of notAllowed){
		  				if(obj.value.includes(chara)){
		  								obj.value =obj.value.replaceAll(chara,"_");
		  							
								navigator.vibrate(100);
		  				}
		  }
}
