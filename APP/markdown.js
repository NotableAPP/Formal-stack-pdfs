showdown.setFlavor('github');
showdown.setOption('ghMentions', 'true');
showdown.setOption('ghMentionsLink', '#{u}');
showdown.setOption('underline', 'true');
var live=(txt,bd)=>{
 let conv = new showdown.Converter()
 bd.innerHTML = conv.makeHtml(txt)
}
var printPage = (txt) =>{
    let conv = new showdown.Converter()
    sessionStorage.textformd=conv.makeHtml(txt);
    window.location.assign("mdprint.html")
}
var latestPreviewState = "middle";
var mdprev = {
   maximize:()=>{
       $("div.markbd").style.width="100%"  
       $("div.markbd").style.left="0%"
       latestPreviewState="maximize";
   },
   minimize:()=>{
    if(latestPreviewState=="maximize"){
    $("div.markbd").style.width="50%"  
    $("div.markbd").style.left="50%"
    $("textarea").style.width="50%"
    latestPreviewState="middle";
    }else if(latestPreviewState=="middle"){
    
    $("div.markbd").style.left="calc(100% - 10px)"
    $("textarea").style.width="calc(100% - 10px)";
    $("div.markbd").addEventListener("touchstart",mdprev.adjust)
    $("div.markbd").addEventListener("mousedown",mdprev.adjust)
    latestPreviewState="minimize";
    $("div.markbd").classList.add("hid")
    }
   },
   adjust:()=>{
     if(latestPreviewState=="minimize"){
        $("div.markbd").style.width="50%"  
        $("div.markbd").style.left="50%"
        $("textarea").style.width="50%"
        console.log("hidd")
        $("div.markbd").addEventListener("touchstart",mdprev.adjust,false)
        $("div.markbd").addEventListener("mousedown",mdprev.adjust,false)
        latestPreviewState="middle";
        $("div.markbd").classList.remove("hid")
    } 
   },
   fetch:()=>{
     Ted().alert({
       title:"Enter Url to fetch",
       content:`
       Enter url here or GitHub repo url
       like
       <br>
       <code>gh: username/repositary/branch/file_url</code>
       <input id="url_gh" />
       `,
       html:true,
       btns:[
         {
           val:"fetch",
           fun:e=>{
            let url = $("#url_gh").value;
            console.log((url.substring(0,3)=="gh:"))
            if(url.substring(0,3)=="gh:"){
              console.log("succ")
              let file_url = url.substring(3,url.length)
              console.log(file_url)
              readTextFile(`https://raw.githubusercontent.com/${file_url}`,text=>{
                $("textarea").value=text;
              })
            }else{
              readTextFile(url,text=>{
                $("textarea").value=text;
              })
            }
            del(e);
           }
         }
       ]
     })
   }
}
var sync_mdpg = () =>{
    var urls = new URL(window.location.href);
    let ui_state = urls.searchParams.get("uiofmdpage");
    console.log(ui_state)
    if(ui_state=="mini"){
        mdprev.minimize();
    }else if(ui_state=="max"){     
        mdprev.maximize();
    }

}