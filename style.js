var ww=window.innerWidth, wh=window.innerHeight;
var a=document.getElementsByClassName('bton');
for(var i=0; i<a.length; ++i)a[i].style.width=a[i].style.height=Math.min(ww/6, wh/6), a[i].style.fontSize=Math.min(ww/45, wh/50);
document.querySelector('#board').style.fontSize=Math.min(ww/45, wh/50);
