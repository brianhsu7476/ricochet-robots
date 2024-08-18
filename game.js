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

function ascii(c){return c.charCodeAt(0);}

var r=[], c=[], gx=[], gy=[], per=[];
var step=0, gr=0, g, id;

function initMap(){
	for(var i=0; i<4; ++i){
		var a, ok=1;
		while(ok){
			ok=0, a=Math.floor(Math.random()*4);
			for(var j=0; j<i; ++j)if(a==per[j])ok=1;
		}
		per.push(a);
	}
	for(var i=0; i<16; ++i)r.push("ooooooooooooooooo".split('')), c.push("ooooooooooooooooo".split(''));
	for(var i=0; i<8; ++i)for(var j=0; j<9; ++j){
		if(r[i][j]=='o')r[i][j]=R[per[0]][i][j];	if(c[i][j]=='o')c[i][j]=C[per[0]][i][j];
		if(c[i][16-j]=='o')c[i][16-j]=R[per[1]][i][j];	if(r[15-i][j]=='o')r[15-i][j]=C[per[1]][i][j];
		if(r[15-i][16-j]=='o')r[15-i][16-j]=R[per[2]][i][j];	if(c[15-i][16-j]=='o')c[15-i][16-j]=C[per[2]][i][j];
		if(c[15-i][j]=='o')c[15-i][j]=R[per[3]][i][j];	if(r[i][16-j]=='o')r[i][16-j]=C[per[3]][i][j];
	}
	var k=0;
	for(var i=0; i<Gx[per[0]].length; ++i, ++k)gx.push(ascii(Gx[per[0]][i])-97), gy.push(ascii(Gy[per[0]][i])-97);
	for(var i=0; i<Gx[per[1]].length; ++i, ++k)gx.push(-ascii(Gy[per[1]][i])+112), gy.push(ascii(Gx[per[1]][i])-97);
	for(var i=0; i<Gx[per[2]].length; ++i, ++k)gx.push(-ascii(Gx[per[2]][i])+112), gy.push(-ascii(Gy[per[2]][i])+112);
	for(var i=0; i<Gx[per[3]].length; ++i, ++k)gx.push(ascii(Gy[per[3]][i])-97), gy.push(-ascii(Gx[per[3]][i])+112);
}

class Point{
	constructor(x, y){this.x=x, this.y=y;}
	add(r){return new Point(this.x+r.x, this.y+r.y);}
	eq(r){return this.x==r.x&&this.y==r.y;}
};

var robot=[], steps=[];

function makeMap(){
	var s='';
	s+=String(step)+" steps<br>Robot #"+String(gr)+" to X<br>";
	for(var i=0; i<65; ++i)s+=String(i&3?'_':'.');
	s+='<br>';
	for(var i=0; i<16; ++i){
		for(var j=0; j<65; ++j){
			if(j&3){
				if((j&3)==2){
					var k=0;
					if(gx[g]==i&&gy[g]==j>>2){
						for(; k<4; ++k)if(robot[k].eq(new Point(i, j>>2))){
							s+='Y';
							break;
						}
						if(k==4)s+='X';
						k=5;
					}
					for(; k<4; ++k)if(robot[k].eq(new Point(i, j>>2))){
						s+=String(k);
						break;
					}
					if(k==4)s+=' ';
				}
				else s+=' ';
			}
			else s+=String(r[i][j>>2]=='l'?'|':' ');
		}
		s+='<br>';
		for(var j=0; j<65; ++j)s+=String(j&3?c[j>>2][i+1]=='l'?'_':' ':r[i][j>>2]=='l'?'|':'.');
		s+='<br>';
	}
	document.querySelector('#board').innerHTML=s;
}

function move(id, d){
	console.log(3);
	var p=d==0?new Point(1, 0):d==1?new Point(0, 1):d==2?new Point(-1, 0):new Point(0, -1);
	for(; ; robot[id]=robot[id].add(p)){
		for(var i=0; i<4; ++i)if(robot[id].add(p).eq(robot[i]))return;
		if(d==0&&c[robot[id].y][robot[id].x+1]=='l')return;
		if(d==1&&r[robot[id].x][robot[id].y+1]=='l')return;
		if(d==2&&c[robot[id].y][robot[id].x]=='l')return;
		if(d==3&&r[robot[id].x][robot[id].y]=='l')return;
	}
}

function init(){
	step=0, gr=id=Math.floor(Math.random()*4), g=Math.floor(Math.random()*17), cnt=0;
	steps=[];
	for(var i=0; i<4; ++i)steps.push([robot[i]]);
	makeMap();
}

function update(key){
	var change=0, s="SDWA";
	for(var i=0; i<4; ++i)if(key==s[i])move(id, i), change=1;
	s="UIOP";
	for(var i=0; i<4; ++i)if(i!=id&&key==s[i])id=i, makeMap();
	if(change){for(var i=0; i<4; ++i)steps[i].push(robot[i]); ++step, makeMap();}
	if(step&&key=='R'){for(var i=0; i<4; ++i)robot[i]=steps[i][step-1], steps[i].pop(); --step, makeMap();}
	if(key=='N')init();
	//if(!cnt&&key('T'))t=clock(), cout<<"Start countdown!\n", cnt=1;
	/*if(cnt&&clock()-t>cnt*1000){
		cout<<"\b\b";
		if(cnt>50)cout<<' ';
		cout<<60-cnt++;
	}
	if(cnt==61)cout<<"\nTime's up!\n", cnt=0;*/
}

robot.push(new Point(0, 0)), robot.push(new Point(0, 15)), robot.push(new Point(15, 15)), robot.push(new Point(15, 0));
initMap(), init(), makeMap();

document.addEventListener('keydown', function(evt){
	if(evt.code.substring(0, 3)=='Key')update(evt.code[3]);
});
