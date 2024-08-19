var ww=window.innerWidth, wh=window.innerHeight;
var a=document.getElementsByClassName('bton');
var btonSize=Math.min(ww/6, wh/6), bdSize=Math.min(ww/45, wh/50);
for(var i=0; i<a.length; ++i)a[i].style.width=a[i].style.height=btonSize, a[i].style.fontSize=bdSize;
document.querySelector('#board').style.fontSize=bdSize;
