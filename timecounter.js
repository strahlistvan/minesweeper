var TimeCounter = 
{
	targetDiv	 	: null,
	currentSeconds  : 0,
	currentMinutes	: 0,
	isCounting		: false,
	
	/**  Returns a HTML DOM element which contains the current time in a div which ID is 'timer'. */
	getTimerDivElement : function()
	{		
		this.isCounting = false;
		
		var counterDiv = document.createElement("div");
		counterDiv.id = "timer";
		
		var min1 = Math.floor(this.currentMinutes / 10) % 100;
		var min1Img = document.createElement("img");
		min1Img.src = "Images/score/"+min1+".bmp";
		min1Img.style.height = "30px";
		min1Img.id = "min1Img";
		
		var min2 = this.currentMinutes % 10;
		var min2Img = document.createElement("img");
		min2Img.src = "Images/score/"+min2+".bmp";
		min2Img.style.height = "30px";
		min2Img.id = "min2Img";

		
		var dotsImg = document.createElement("img");
		dotsImg.src = "Images/score/dots.bmp";
		dotsImg.style.height = "30px";
		
		var sec1 = Math.floor(this.currentSeconds / 10);
		var sec1Img = document.createElement("img");
		sec1Img.src = "Images/score/"+sec1+".bmp";
		sec1Img.style.height = "30px";
		sec1Img.id = "sec1Img";		
		
		var sec2 = this.currentSeconds % 10;
		var sec2Img = document.createElement("img");
		sec2Img.src = "Images/score/"+sec2+".bmp";
		sec2Img.style.height = "30px";
		sec2Img.id = "sec2Img";		
		
		counterDiv.appendChild(min1Img);
		counterDiv.appendChild(min2Img);
		counterDiv.appendChild(dotsImg);
		counterDiv.appendChild(sec1Img);
		counterDiv.appendChild(sec2Img);		
				
		return counterDiv;	
	},
	
	/** Starts an interval what is refershing the timer div element secondly. */
	startClock : function()
	{	
		this.isCounting = true;
		var self = this;
		self.isCounting = true;
		counterInterval = setInterval(function() 
		{	
			//Refresh timer HTML element
			var timerElement = document.getElementById("timer").parentElement;
			timerElement.innerHTML = "";
			timerElement.appendChild(self.getTimerDivElement());
			
			self.currentSeconds = (self.currentSeconds + 1) % 60;
			self.currentMinutes = (self.currentSeconds == 0) ? self.currentMinutes + 1 : self.currentMinutes;
		}, 1000);
	},
	
	/** Clear the timer interval and set the timer to 00:00 */
	stopClock : function()
	{
		this.isCounting = false;
		clearInterval(counterInterval);
		this.currentMinutes = this.currentSeconds = 0;
	}
	
}