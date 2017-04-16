function MineSweeperButton(rowIndex, columnIndex, hasMine) 
{
	this.rowIndex = rowIndex;
	this.columnIndex = columnIndex;
	this.hasMine = hasMine;
	
	this.appendTo = function(parentElement) 
	{
		var msbtn = document.createElement("div");
	
		msbtn.style.width = "40px";
		msbtn.style.height = "40px";
		msbtn.style.backgroundColor = "lightgrey";
		msbtn.class = "msbtn";
		msbtn.onmousedown = function(evt) 
		{
			var isRight = false;
			var isLeft = false;
			
			if ("which" in evt)
			{
				isRight = (evt.which == 3);
				isLeft 	= (evt.which == 1);
			}
			else if ("button" in evt)
			{
				isRight = (evt.button == 3);
				isLeft = (evt.button == 1);
			}
			
			if (isRight) 
			{
				document.body.style.backgroundColor = "yellow";
				msbtn.style.backgroundImage = "url('Images/flagged.png')";
				msbtn.style.backgroundSize = "cover";
				
				--MineSweeper.remainingMines;
				console.log("Mines left: " + MineSweeper.remainingMines);

			}
			else if (isLeft) 
			{
				document.body.style.backgroundColor = "green";
				msbtn.style.backgroundImage = "Images/flagged.png";
				
			}
		}
		parentElement.appendChild(msbtn);
	}
}