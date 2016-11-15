function Player(x,y,w,h,wasd,name){
	this.name=name
	this.x=x
	this.y=y
	this.win=0
	this.w=w
	this.h=h
	this.wasd=wasd
	this.level=1
	this.history=[]
	this.historia=[]
	this.start=-2
	this.target=-1
	this.moves=0
	this.score=0
	this.total=0
	this.draws=function(){
		textSize(20)
		fill(255)
		//rect(this.x+this.w*5/7,this.y+this.h/3,this.w*2/7-1,this.h*1/3)
		rect(this.x+this.w*17/21,this.y+this.h/3,this.w*2/21-1,this.h*1/6)
		rect(this.x+this.w*17/21,this.y+this.h*3/6,this.w*2/21-1,this.h*1/6)
		rect(this.x+this.w*5/7,this.y+this.h*3/6,this.w*2/21,this.h*1/6)
		rect(this.x+this.w*19/21-1,this.y+this.h*3/6,this.w*2/21,this.h*1/6)
		
		
		rect(this.x+this.w*0/7,this.y,this.w/7,this.h/6)
		
		
		rect(this.x+this.w*1/7,this.y,this.w/7,this.h/6)
		strokeWeight(5)
		line(this.x+this.w*1.2/7,this.y+this.h/12,this.x+this.w*1.8/7,this.y+this.h/12)
		line(this.x+this.w*1.5/7,this.y+this.h*0.5/12,this.x+this.w*1.8/7,this.y+this.h/12)
		line(this.x+this.w*1.5/7,this.y+this.h*1.5/12,this.x+this.w*1.8/7,this.y+this.h/12)
		strokeWeight(1)
		rect(this.x+this.w*0/7,this.y+this.h*1/6,this.w/7,this.h/6)
		rect(this.x+this.w*0/7,this.y+this.h*2/6,this.w/7,this.h/6)
		rect(this.x+this.w*0/7,this.y+this.h*3/6,this.w/7,this.h/6)
		rect(this.x+this.w*2/7,this.y,this.w/7,this.h/6)
		rect(this.x+this.w*1/7,this.y+this.h*1/6,this.w*4/7,this.h/2)
		rect(this.x,this.y+2*this.h/3,this.w-1,this.h/3-1)
		if(this.win===1){
			fill(0,255,0)
			rect(this.x,this.y+2*this.h/3,this.w-1,this.h/3-1)
		}
		//rect(this.x,this.y+2*this.h/3,this.w-1,this.h/3-1)
		fill(0)
		if(wasd[0]!=="&"){
		text(this.wasd[0]+"\n"+"undo",this.x+this.w*17/21+3,this.y+this.h/3,this.w*2/21-1,this.h*1/6)
		text(this.wasd[2]+"\n"+"*2",this.x+this.w*17/21+3,this.y+this.h*3/6-10,this.w*2/21-1,this.h*1/6)
		text(this.wasd[1]+"\n"+"+2",this.x+this.w*5/7+3,this.y+this.h*3/6-10,this.w*2/21,this.h*1/6)
		text(this.wasd[3]+"\n"+"/2",this.x+this.w*19/21+2,this.y+this.h*3/6-10,this.w*2/21,this.h*1/6)
		}else{
		text("∧"+"\n"+"undo",this.x+this.w*17/21+3,this.y+this.h/3,this.w*2/21-1,this.h*1/6)
		text("v"+"\n"+"*2",this.x+this.w*17/21+3,this.y+this.h*3/6-10,this.w*2/21-1,this.h*1/6)
		text("<"+"\n"+"+2",this.x+this.w*5/7+3,this.y+this.h*3/6-10,this.w*2/21,this.h*1/6)
		text(">"+"\n"+"/2",this.x+this.w*19/21+2,this.y+this.h*3/6-10,this.w*2/21,this.h*1/6)
		}
		text("num\n"+this.start,this.x+this.w*0/7,this.y-10,this.w/7,this.h/6)
		text("level\n"+this.level,this.x+this.w*0/7,this.y+this.h*1/6-10,this.w/7,this.h/6)
		text("total\n"+this.total,this.x+this.w*0/7,this.y+this.h*2/6-10,this.w/7,this.h/6)
		text("moves\n"+this.moves,this.x+this.w*0/7,this.y+this.h*3/6-10,this.w/7,this.h/6)
		text("target\n"+this.target,this.x+this.w*2/7,this.y-10,this.w/7,this.h/6)
		textSize(50)
		text(this.name,this.x+this.w*1/7,this.y+this.h*1/6,this.w*4/7,this.h/2)
		textSize(30)
		text("score\n"+this.score,this.x,this.y+2*this.h/3-10,this.w-1,this.h/3-1)
	}
	this.keyPresed=function(k){
		for(var i = 0;i<4;i++){
			if(k===unchar(this.wasd[i])){
				if(i===0){
				this.undo()
				}else if(i===1){
					this.start = 2+this.start
					this.moves++
					append(this.history,0)
				}else if(i===2){
					this.start = 2*this.start
					this.moves++
					append(this.history,1)
				}else if(i===3){
					if(this.start%2===0){
					this.start = this.start/2
					this.moves++
					append(this.history,2)
					}
					
				}
				append(this.historia,this.start)
			}
		}
	}
	this.undo=function(){
		if(this.history[this.history.length-1]===0){
		this.start=this.start-2
		this.history.splice(-1,1)
		this.historia.splice(-1,1)
		this.moves--
	}else if(this.history[this.history.length-1]===1){
		this.start=this.start/2
		this.history.splice(-1,1)
		this.historia.splice(-1,1)
		this.moves--
	}else if(this.history[this.history.length-1]===2){
		this.start=this.start*2
		this.history.splice(-1,1)
		this.historia.splice(-1,1)
		this.moves--
	}
	}
	this.reset=function(){
	}
	this.vict=function(){
	}
}