var ne = 100;
var plays = 1
var playing = 0
var players = []
var historic = [];
var target = 1;
var level = 1;
var shortest = 0;
var players 

function setup() {
  createCanvas(windowWidth,windowHeight)
  textFont("Input Mono Narrow")
  textAlign(CENTER,CENTER)
  slider=createSlider(1,4,2)
  slider.style('height', '80px')
  slider.size(200)
  inp0 = createInput('noel');
  inp1 = createInput('beppe');
  inp2 = createInput('otto');
  inp3 = createInput('melker');

}

function draw() {
  if(playing===1){
  for(var i = 0;i<players.length;i++){
  players[i].draws()
  }
  strokeWeight(10)
  if(plays>2){
  line(0,height/2,width,height/2)
  }
  if(plays>1){
  line(width/2,height,width/2,0)
  }
  strokeWeight(1)
  var count = 0
  for(var j = 0;j<players.length;j++){
  if(players[j].start==players[j].target){
  	count++
  	if(players[j].moves>players[j].level){
  		players[j].win=1
  	}else if(players[j].moves===shortest.length-1){
  		players[j].win=3
  	}else if(players[j].moves<=players[j].level){
  		players[j].win=2
  	}
  }else{
  	players[j].win=0
  	players[j].score+=(players[j].moves+1)
  }
  }
  if(count===players.length&&keyIsPressed === true&&keyCode===32){
  	ne = next()
  	level++
  	target = createproblem(level,ne)
  	shortest = solve(ne,target)
  	for(var k = 0;k<players.length;k++){
  	players[k].total+=players[k].score*(4-players[k].win)
  	players[k].score=0
  	players[k].target=target
  	players[k].start = ne
  	players[k].level++
  	players[k].moves = 0
  	players[k].history =[]
  	players[k].historia =[players[k].start]
  	}
  }
}else{
plays=slider.value()
}

}


function next(){
	return int(random(101))
}

function createproblem(lev,n){
	var list = []
	var cool = 3
	for(var i = 0;i<lev;i++){
		
		if(doit(n,list)%2===0){
			cool = 3
		}else{cool = 2}
		list[i] = int(random(cool))
		if(i>0){
			while(((list[i]===2&&list[i-1]===1)||(list[i]===1&&list[i-1]===2))){
				list[i] = int(random(cool))
			}
		}
	}
	return doit(n,list)
}
function doit(n,list){
	var sum = n;
	for(var i = 0;i<list.length;i++){
		if(list[i]===0){
			sum+=2
		}else if(list[i]===1){
			sum*=2
		}else if(list[i]===2){
			sum/=2
		}
	}
	return sum
}

function undo(){
	if(historic[historic.length-1]===0){
		ne=ne-2
		historic.splice(-1,1)
		moves--
	}else if(historic[historic.length-1]===1){
		ne=ne/2
		historic.splice(-1,1)
		moves--
	}else if(historic[historic.length-1]===2){
		ne=ne*2
		historic.splice(-1,1)
		moves--
	}
}

function reset(){
	while(historic.length>0){
		undo()
	}
}


function keyPressed(){
	if(playing === 0&&keyCode===32){
		playing=1
		sets(width,height,inp0.value(),inp1.value(),inp2.value(),inp3.value())
		inp0.remove()
		inp1.remove()
		inp2.remove()
		inp3.remove()
		slider.remove()
	}
	for(var i = 0;i<players.length;i++){
		players[i].keyPresed(keyCode)
	}
}

function sets(width,height,name1,name2,name3,name4){
  if(plays==4){
  players[0] = new Player(0,0,width/2,height/2,["W","A","S","D"],name1)
  players[1] = new Player(width/2-1,0,width/2,height/2,["&","%","(","'"],name2)
  players[2] = new Player(0,height/2,width/2,height/2,["T","F","G","H"],name3)
  players[3] = new Player(width/2-1,height/2,width/2,height/2,["I","J","K","L"],name4)
  }else if(plays==3){
  players[0] = new Player(0,0,width/2,height/2,["W","A","S","D"],name1)
  players[1] = new Player(width/2-1,0,width/2,height/2,["&","%","(","'"],name2)
  players[2] = new Player(0,height/2,width/2,height/2,["I","J","K","L"],name3)
  }else if(plays==2){
  players[0] = new Player(0,0,width/2,height,["W","A","S","D"],name1)
  players[1] = new Player(width/2-1,0,width/2,height,["&","%","(","'"],name2)
  }else if(plays==1){
  	players[0] = new Player(0,0,width,height,["W","A","S","D"],name1)
  }
  ne = next()
  target = createproblem(level,ne)
  for(var i = 0;i<players.length;i++){
  players[i].start = ne
  players[i].target = target
  players[i].historia =[players[i].start]
  }
  shortest = solve(ne,target)
}