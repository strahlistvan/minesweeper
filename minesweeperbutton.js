function MineSweeperField(rowIndex, columnIndex, hasMine) 
{
	var flagged = false;
	var opened = false;
	var hasMine = hasMine;
	var self = this;
	
	this.msbtn = document.createElement("div")	
	
	this.appendTo = function(parentElement) 
	{
	
		self.msbtn.style.width = "40px";
		self.msbtn.style.height = "40px";
		self.msbtn.style.backgroundColor = "lightgrey";
		self.msbtn.class = "self.msbtn";
		self.msbtn.onmousedown = function(evt) 
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
			
			if (isRight && !self.flagged && !self.opened) 
			{
				document.body.style.backgroundColor = "yellow";
			//	self.msbtn.style.backgroundImage = "url('Images/flagged.png')";
			//	self.msbtn.style.backgroundSize = "cover";
				
				--MineSweeper.remainingMines;
				self.flagged = true;
				
				console.log("Mines left: " + MineSweeper.remainingMines);
				//MineSweeper.repaintGrid("gameboard");
				
			}
			else if (isLeft) 
			{
				document.body.style.backgroundColor = "green";
				
				if (!self.flagged)
				{
					if (MineSweeper.grid[rowIndex][columnIndex].hasMine)
					{ //explode!
					//	self.msbtn.style.backgroundImage = "url('Images/bomb.png')";
					//	self.msbtn.style.backgroundSize = "cover";
						MineSweeper.openAllFields();
						MineSweeper.makeSadFace();
						//MineSweeper.repaintGrid("gameboard");

					}
					else //open field (no mine)
					{
						MineSweeper.openField(self.getRowIndex(), self.getColumnIndex());
						//MineSweeper.repaintGrid("gameboard");
					}
				}
				else //remove flag
				{
					self.msbtn.style.backgroundImage = "none";
					++MineSweeper.remainingMines;
					flagged = false;
					
					console.log("Mines left: " + MineSweeper.remainingMines);
					//MineSweeper.repaintGrid("gameboard");

				}
			}
			MineSweeper.repaintGrid("gameboard");
		}
		
		parentElement.appendChild(self.msbtn);
	}
	
	this.getButton = function()
	{
		return self.msbtn;
	}
	
	this.isOpened = function()
	{
		return opened;
	}
	
	this.setOpened = function(isOpened)
	{
		opened = isOpened;
	}
	
	this.isFlagged = function()
	{
		return flagged;
	}
	
	this.setFlagged = function(isFlagged)
	{
		flagged = isFlagged;
	}
	
	this.getRowIndex = function()
	{
		return rowIndex;
	}
	
	this.getColumnIndex = function()
	{
		return columnIndex;
	}
	
	this.getNeighbourMinesCount = function()
	{
		return MineSweeper.countNeigbourMines(rowIndex, columnIndex);
	}
}