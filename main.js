var filters = document.querySelectorAll("ul li input");
var labels = document.querySelectorAll("ul li label");
var download =_("download");
let reset = _("reset");
let img = _("image");
let upload = _("upload");
let reload = _("reload")
const canvas = _("canvas");
const ctx = canvas.getContext("2d");
function _(id)
{
    return document.getElementById(id);
}

window.onload=function ()
{
    download.style.display="none";
    reset.style.display="none";
    canvas.style.display="none";
    reload.style.display="none";
    filters.forEach(filter => {filter.disabled=true;})
    
   

}
upload.onchange = function ()
{
    resetFilters();
   
    download.style.display="block";
    reset.style.display="block";
    reload.style.display="block";
    upload.disabled=true;
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload=function()
    {
    img.src=file.result;
    filters.forEach(filter => {filter.disabled=false;})

    }
    img.onload =function()
    {
        saveImage();
        canvas.style.display="block";
    }
    upload.style.display="none";
    
   

}
function resetFilters ()
{
    
   ctx.filter="none";
   ctx.drawImage(img,0,0,canvas.width,canvas.height);
   filters[0].value ="100";
   filters[1].value ="100";
   filters[2].value ="100";
   filters[3].value ="0";
   filters[4].value ="0";
   filters[5].value ="0";
   filters[6].value ="0";

   labels[0].innerHTML=`saturate(${filters[0].value*100/200}%)`;
   labels[1].innerHTML=`contrast(${filters[1].value*100/200}%)`;
   labels[2].innerHTML=`brightness(${filters[2].value*100/200}%)`;
   labels[3].innerHTML=`sepia(${filters[3].value*100/200}%)`;
   labels[4].innerHTML=`grayscale(${filters[4].value*100}%)`;
   labels[5].innerHTML=`blur(${filters[5].value*100/10}%)`;
   labels[6].innerHTML=`hue-rotate(${filters[6].value*100/350}%)`;
   
}
function saveImage ()
{
    canvas.width=img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    img.style.display="none";
}
filters.forEach(filter =>{
    filter.addEventListener("input",function(){
        ctx.filter=`
        saturate(${filters[0].value}%)
        contrast(${filters[1].value}%)
        brightness(${filters[2].value}%)
        sepia(${filters[3].value}%)
        grayscale(${filters[4].value})
        blur(${filters[5].value}px)
        hue-rotate(${filters[6].value}deg)
        `;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);

        labels[0].innerHTML=`saturate(${filters[0].value*100/200}%)`;
        labels[1].innerHTML=`contrast(${filters[1].value*100/200}%)`;
        labels[2].innerHTML=`brightness(${filters[2].value*100/200}%)`;
        labels[3].innerHTML=`sepia(${filters[3].value*100/200}%)`;
        labels[4].innerHTML=`grayscale(${filters[4].value*100}%)`;
        labels[5].innerHTML=`blur(${filters[5].value*100/10}%)`;
        labels[6].innerHTML=`hue-rotate(${filters[6].value*100/350}%)`;

        
        
    })
})

reset.onclick = function (){resetFilters()};
download.onclick = function (){
    download.href = canvas.toDataURL();
}
reload.onclick = function ()
{
    location.reload();
}
