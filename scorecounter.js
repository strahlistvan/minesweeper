var ScoreCounter = 
{
	targetDiv	 : null,
	currentScore : 0,
	self		 : this,
	
	getScoreDivElement : function(scoreParam)
	{
		var counterDiv = document.createElement("div");
		counterDiv.id = "counter";
		
		var num1 = Math.floor(scoreParam%1000/100);
		var num1Img = document.createElement("img");
		num1Img.src = "Images/score/"+num1+".bmp";
		num1Img.style.width = "30px";
		num1Img.style.height = "30px";
		
		var num2 = Math.floor(scoreParam%100/10);
		var num2Img = document.createElement("img");
		num2Img.src = "Images/score/"+num2+".bmp";
		num2Img.style.width = "30px";
		num2Img.style.height = "30px";
		
		var num3 = scoreParam%10;
		var num3Img = document.createElement("img");
		num3Img.src = "Images/score/"+num3+".bmp";
		num3Img.style.width = "30px";
		num3Img.style.height = "30px";		
		
		counterDiv.appendChild(num1Img);
		counterDiv.appendChild(num2Img);
		counterDiv.appendChild(num3Img);
		
		return counterDiv;	
	}
	
	
	
}