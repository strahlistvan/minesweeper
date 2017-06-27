function MineSweeperField(rowIndex, columnIndex, hasMinePar) 
{
	this.flagged = false;
	this.opened = false;
	this.hasMine = hasMinePar;
	
	var self = this;
	
	//console.log("hasMine="+hasMinePar + " hasmine=" + this.hasMine + " self.hasMine=" + self.hasMine);
	
	this.msbtn = document.createElement("div");
	
	this.appendTo = function(parentElement) 
	{	
		self.msbtn.style.width = "40px";
		self.msbtn.style.height = "40px";
		self.msbtn.style.backgroundColor = "lightgrey";
		self.msbtn.class = "self.msbtn";
		self.msbtn.onmousedown = function(evt) 
		{
			if (MineSweeper.isPlayerDied)
				return;
			
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
			
			/** Handling click actions **/
			
			if (self.flagged)
			{
				self.flagged = false;
				++MineSweeper.remainingMines;
			}
			else if (isRight && !self.flagged && !self.opened) 
			{				
				--MineSweeper.remainingMines;
				self.flagged = true;
				MineSweeper.repaintGrid(MineSweeper.getTargetDiv());

				console.log("Mines left: " + MineSweeper.remainingMines);
				
			}
			else if (isLeft) 
			{				
				if (!MineSweeper.isGameRunning)
				{
					var cycle = 0; //to avoid infinite loops
					do 
					{
						MineSweeper.clearField(rowIndex, columnIndex);
						MineSweeper.placeMines();

						console.log("cycle = "+cycle++);
					} 
					while ( ( MineSweeper.isMineField(rowIndex, columnIndex) 
							    || MineSweeper.countNeigbourMines(rowIndex, columnIndex) > 0 )
							  && cycle < 10000 );
					
					MineSweeper.isGameRunning = true;

				}
				
				if (!self.flagged)
				{
					if (MineSweeper.grid[rowIndex][columnIndex].hasMine)
					{ //explode!

						var bangSound = new Audio("explosion.wav");
						bangSound.play();
						
					    MineSweeper.isPlayerDied = true;
						MineSweeper.openAllFields();
						MineSweeper.isGameRunning = false;

					}
					else //open field (no mine)
					{
						MineSweeper.openField(self.getRowIndex(), self.getColumnIndex());
					}
				}
				else //remove flag
				{
					self.msbtn.style.backgroundImage = "none";
					++MineSweeper.remainingMines;
					flagged = false;
					
					console.log("Mines left: " + MineSweeper.remainingMines);

				}
			}
			// you win!
			if (!MineSweeper.hasOpenableField() && MineSweeper.isGameRunning)
			{
				var winSound = new Audio("winner.wav");
				winSound.play();
				
				MineSweeper.remainingMines = 0;
				MineSweeper.isPlayerWin = true;
				MineSweeper.openAllFields();
				MineSweeper.isGameRunning = false;
			}
			
			//if (MineSweeper.isGameRunning)
			MineSweeper.repaintGrid(MineSweeper.getTargetDiv());
		}
		
		parentElement.appendChild(self.msbtn);
	}
	
	this.getButton = function()
	{
		return self.msbtn;
	}
	
	this.isOpened = function()
	{
		return self.opened;
	}
	
	this.setOpened = function(isOpened)
	{
		self.opened = isOpened;
	}
	
	this.isFlagged = function()
	{
		return self.flagged;
	}
	
	this.setFlagged = function(isFlagged)
	{
		self.flagged = isFlagged;
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
	
	this.isMineField = function()
	{
		 return this.hasMine;
		 return MineSweeper.isMineField(rowIndex, columnIndex);
	}
}