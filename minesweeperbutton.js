function MineSweeperField(rowIndex, columnIndex, hasMine) 
{
	var flagged = false;
	var opened = false;
	var hasMine = hasMine;
	
	var msbtn = document.createElement("div");	
	var self = this;
	
	this.appendTo = function(parentElement) 
	{
	
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
			
			if (isRight && !flagged && !opened) 
			{
				document.body.style.backgroundColor = "yellow";
				msbtn.style.backgroundImage = "url('Images/flagged.png')";
				msbtn.style.backgroundSize = "cover";
				
				--MineSweeper.remainingMines;
				flagged = true;
				
				console.log("Mines left: " + MineSweeper.remainingMines);
			}
			else if (isLeft) 
			{
				document.body.style.backgroundColor = "green";
				
				if (!flagged)
				{
					if (MineSweeper.grid[rowIndex][columnIndex].hasMine)
					{ //explode!
						msbtn.style.backgroundImage = "url('Images/bomb.png')";
						msbtn.style.backgroundSize = "cover";
						opened = 1;
					}
					else //open field (no mine)
					{
						MineSweeper.openField(self);
					}
				}
				else //remove flag
				{
					msbtn.style.backgroundImage = "none";
					++MineSweeper.remainingMines;
					flagged = false;
					
					console.log("Mines left: " + MineSweeper.remainingMines);
				}
			}
		}
		parentElement.appendChild(msbtn);
	}
	
	this.getButton = function()
	{
		return msbtn;
	}
	
	this.isOpened = function()
	{
		return opened;
	}
	
	this.setOpened = function(isOpened)
	{
		opened = isOpened;
	}
	
	this.getRowIndex = function()
	{
		return rowIndex;
	}
	
	this.getColumnIndex = function()
	{
		return columnIndex;
	}
	
/*	this.openField = function() 
	{				
		msbtn.style.backgroundImage = "url('Images/"+neighbourCount+".png')";
		msbtn.style.backgroundSize = "cover";
		opened = true;
	}
*/
}