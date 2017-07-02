var TimeCounter = 
{
	targetDiv	 	: null,
	currentSeconds  : 0,
	currentMinutes	: 0,
	isCounting		: false,
	
	getTimerDivElement : function()
	{		
		this.isCounting = false;
		console.log("sec " + this.currentSeconds);
		
		var counterDiv = document.createElement("div");
		counterDiv.id = "timer";
		
		var min1 = Math.floor(this.currentMinutes/10)%100;
		var min1Img = document.createElement("img");
		min1Img.src = "Images/score/"+min1+".bmp";
		min1Img.style.height = "30px";
		min1Img.id = "min1Img";
		
		var min2 = this.currentMinutes%10;;
		var min2Img = document.createElement("img");
		min2Img.src = "Images/score/"+min2+".bmp";
		min2Img.style.height = "30px";
		min2Img.id = "min2Img";

		
		var dotsImg = document.createElement("img");
		dotsImg.src = "Images/score/dots.bmp";
		dotsImg.style.height = "30px";
		
		var sec1 = Math.floor(this.currentSeconds/10);
		var sec1Img = document.createElement("img");
		sec1Img.src = "Images/score/"+sec1+".bmp";
		sec1Img.style.height = "30px";
		sec1Img.id = "sec1Img";		
		
		var sec2 = this.currentSeconds%10;
		var sec2Img = document.createElement("img");
		sec2Img.src = "Images/score/"+sec2+".bmp";
		sec2Img.style.height = "30px";
		sec2Img.id = "sec2Img";		
		
		counterDiv.appendChild(min1Img);
		counterDiv.appendChild(min2Img);
		counterDiv.appendChild(dotsImg);
		counterDiv.appendChild(sec1Img);
		counterDiv.appendChild(sec2Img);		
		
		console.log(min1.toString()+min2.toString()+":"+sec1.toString()+sec2.toString());
		
		return counterDiv;	
	},
	
	startClock: function()
	{	
		console.log(this);
		this.isCounting = true;
		var self = this;
		isCounterRunning = setInterval(function() 
		{
			//Refresh timer HTML element
			var timerElement = document.getElementById("timeboard");
			timeboard.innerHTML = "";
			timeboard.appendChild(self.getTimerDivElement());
			
			self.currentSeconds = (self.currentSeconds+1)%60;
			self.currentMinutes = (self.currentSeconds == 0) ? self.currentMinutes + 1 : self.currentMinutes;
			
		}, 1000);
	}
	
	
	
	
}