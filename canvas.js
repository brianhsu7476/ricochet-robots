const fps=60, cw=16, ch=16;
var canvas=document.querySelector('#mycanvas'), ctx=canvas.getContext('2d'), ww=window.innerWidth, wh=window.innerHeight;
var bw=Math.min(ww, wh)*0.45, bh=bw;

const R=[
	[
		"loooloooo",
		"loooooooo",
		"loooooloo",
		"loooooooo",
		"loolooooo",
		"loooooolo",
		"llooooooo",
		"loooooolo"
	],
	[
		"loooolooo",
		"loolooooo",
		"loooooooo",
		"llooooooo",
		"loooooloo",
		"loooooooo",
		"loooooloo",
		"loooloolo"
	],
	[
		"loooloooo",
		"loooooloo",
		"llooooooo",
		"loooooooo",
		"loooooloo",
		"loooooooo",
		"loolooooo",
		"loooooolo"
	],
	[
		"loloooooo",
		"loooloooo",
		"loloooooo",
		"loooooolo",
		"loooooooo",
		"loooooooo",
		"loolooooo",
		"loooooolo"
	]
], C=[
	[
		"loooolooo",
		"loooooloo",
		"loooloooo",
		"loooooooo",
		"loooooooo",
		"loolooooo",
		"loooooooo",
		"looooollo"
	],
	[
		"loooolooo",
		"loooloooo",
		"loloooooo",
		"loooooool",
		"loooooooo",
		"loooooloo",
		"loooloooo",
		"loooooolo"
	],
	[
		"loooloooo",
		"loolooooo",
		"loooooloo",
		"loooooooo",
		"loooooooo",
		"loloooooo",
		"loooloooo",
		"loooooolo"
	],
	[
		"loooooloo",
		"loloooooo",
		"loooooooo",
		"loooooolo",
		"llooooooo",
		"loooooooo",
		"loooloooo",
		"loooooolo"
	]
];

const Gx=["cefg", "bdegh", "bceg", "bcdg"],
	  Gy=["fchb", "cbgfd", "fbgc", "ebgd"];



function draw(){
	ctx.fillStyle='rgba(0, 29, 46, 0.5)';
	ctx.fillRect(-ww/2, -wh/2, ww, wh);
	ctx.beginPath();
	for(var i=-bw; i<=bw; i+=bw*2/cw)ctx.moveTo(i, bh), ctx.lineTo(i, -bh);
	for(var i=-bh; i<=bh; i+=bh*2/ch)ctx.moveTo(bw, i), ctx.lineTo(-bw, i);
	ctx.strokeStyle='rgba(255, 255, 255, 0.5)';
	ctx.stroke();
	/*for(var i=0; i<cw; ++i)for(var j=0; j<ch; ++j){
		ctx.save();
		ctx.translate(bw*2/cw*(i-Math.floor(cw/2)), bh*2/ch*(j-Math.floor(ch/2)));
		ctx.beginPath();
		ctx.arc(0, 0, bw/cw-3, 0, 2*Math.PI);
		ctx.fillStyle=b[i][j].color();
		ctx.fill();
		ctx.restore();
	}*/
	requestAnimationFrame(draw);
}

canvas.width=ww, canvas.height=wh, ctx.translate(ww/2, wh/2);
requestAnimationFrame(draw);
