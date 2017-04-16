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
				console.log("asd: " + MineSweeper.grid);
				document.body.style.backgroundColor = "green";
				if (MineSweeper.grid[this.rowIndex][0] === 1)
				{
					msbtn.style.backgroundImage = "url('Images/bomb.png')";
					msbtn.style.backgroundSize = "cover";
				}
				
			}
		}
		parentElement.appendChild(msbtn);
	}
}