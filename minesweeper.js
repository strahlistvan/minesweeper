/** Global variables to game options  */
var msRows 	  = 12;
var msColumns = 16;
var mineCount = 20;
var targetDiv = null;

window.oncontextmenu = function() 
{ 
	return false; 
}

/** Main object */
var MineSweeper = {
	
	remainingMines : mineCount,
	isPlayerWin : false,
	isPlayerDied : false,
	isGameRunning : false,
	grid : [],
	
	generateGrid : function(rows, columns)
	{		
		this.grid = new Array(rows);
		for (var i=0; i<rows; ++i)
		{
			this.grid[i] = new Array(columns);
			for (var j=0; j<columns; ++j) 
			{
				this.grid[i][j] = new MineSweeperField(i, j, false);
				this.grid[i][j].hasMine = false;
			}
		}
		//this.placeMines();
	},

	/** Generating mines into random places */
	placeMines : function()
	{
		var rows = MineSweeper.grid.length;
		var columns = MineSweeper.grid[0].length;
		
		//clear all mines
		for (var i=0; i<rows; ++i)
		{
			for (var j=0; j<columns; ++j)
			{
				this.grid[i][j].hasMine = false;
			}
		}
			
		var index = mineCount;
		while (index != 0)
		{
			var rand = Math.floor(Math.round(Math.random()*(rows*columns))) ;
			var rowIndex = Math.floor(rand/rows) -1 ; 
			var colIndex = rand%rows - 1;
			
			rowIndex = (rowIndex < 0) ? 0 : rowIndex;
			colIndex = (colIndex < 0) ? 0 : colIndex;
						
			if (!this.grid[colIndex][rowIndex].hasMine)
			{
				this.grid[colIndex][rowIndex].hasMine = true;
				--index;
			}
		}
	},
	
	errorMessage : function(errorText)
	{
		alert(errorText);
		console.log(errorText);
	},
	
	/** Generate a Minesweeper table. Runs when the main page loading.
	 *  @param parentId ID of the HTML element where you want to generate the game table
	 */
	create: function(parentId)
	{
		this.isPlayerDied = false;
		this.isPlayerWin = false;
		this.isGameRunning = false;
		this.remainingMines = mineCount;
		
		this.generateGrid(msRows, msColumns);
		
		targetDiv = null;
		targetDiv = document.getElementById(parentId);
		
		if (!targetDiv) 
			this.errorMessage("Failed to create MineSweeper. Element not found with ID "+parentId);
		
		targetDiv.innerHTML = '';
	
		var table = document.createElement("table");
		//table.className = "w3-table w3-border";
		
		var thead = this.createHeader();
		table.appendChild(thead);
		
		var tbody = document.createElement("tbody");
		
		for (var i=0; i<msRows; ++i)
		{
			var row = document.createElement("tr");
			for (var j=0; j<msColumns; ++j)
			{
				var column = document.createElement("td");
				row.appendChild(column);
				
				var msField = new MineSweeperField(i, j, false);
				msField.appendTo(column);
			}
			
			tbody.appendChild(row);
		}
		
		table.appendChild(tbody);
		targetDiv.appendChild(table);				
	},
	
	/** Regenerate the MineSweeper table. Runs in every onmousedown event 
	 *  @param parentId ID of the HTML element where you want to generate the game table
	 */
	repaintGrid: function(parentId) 
	{	
		targetDiv = null;
		targetDiv = document.getElementById(parentId);
		
		if (!targetDiv) 
			this.errorMessage("Failed to create MineSweeper. Element not found with ID "+parentId);
		
		targetDiv.innerHTML = '';
	
		var table = document.createElement("table");
		
		var thead = this.createHeader();
		table.appendChild(thead);
		
		var tbody = document.createElement("tbody");
		
		for (var i=0; i<msRows; ++i)
		{
			var row = document.createElement("tr");
			for (var j=0; j<msColumns; ++j)
			{
				var column = document.createElement("td");
				row.appendChild(column);
				
				
				if (this.grid[i][j].flagged)
				{
					if (!this.grid[i][j].hasMine && +!this.isGameRunning)
						this.grid[i][j].getButton().style.backgroundImage = "url('Images/flagged_false.png')";					
					else
						this.grid[i][j].getButton().style.backgroundImage = "url('Images/flagged.png')";
					this.grid[i][j].getButton().style.backgroundSize = "cover";					
				}
				else if (this.grid[i][j].opened)
				{
					
					if (this.grid[i][j].hasMine)
					{
						this.grid[i][j].getButton().style.backgroundImage = "url('Images/bomb.png')";
						this.grid[i][j].getButton().style.backgroundSize = "cover";		
					}
					else 
					{
						this.grid[i][j].getButton().style.backgroundImage = "url('Images/"+this.grid[i][j].getNeighbourMinesCount()+".png')";
						this.grid[i][j].getButton().style.backgroundSize = "cover";	
					}

				}
				else
				{
					this.grid[i][j].getButton().style.backgroundImage = "none";
				}
	
				this.grid[i][j].appendTo(column);
			}
			
			tbody.appendChild(row);
		}
		
		table.appendChild(tbody);
		targetDiv.appendChild(table);						
	},
	
	/** @return How many minefiled neighbours have the field in the ith row and the jth column */
	countNeigbourMines: function(i, j)
	{
		var count = 0;
		
		//If the position is not valid
		if (i<0 || j<0 || i>=this.grid.length || j>=this.grid[i].length)
			return 0;
		
		//Top neighbour
		if (i > 0 && this.grid[i-1][j].hasMine)
		{
			++count;
		}
			
		//Top right neighbour
		if (i > 0 && j < this.grid[i-1].length - 1
		    && this.grid[i-1][j+1].hasMine)
		{
			++count;
		}
		
		//Right neighbour
		if (j < this.grid[i].length - 1 
			&& this.grid[i][j+1].hasMine)
		{
			++count;
		}
		
		//Bottom right neighbour
		if (i < this.grid.length - 1 && j < this.grid[i+1].length - 1  
			&& this.grid[i+1][j+1].hasMine)
			{
				++count;
			}
		
		//Bottom neighbour
		if (i < this.grid.length - 1
			&& this.grid[i+1][j].hasMine)
			{
				++count;
			}
	
		//Bottom left neighbour
		if (i < this.grid.length - 1 && j > 0
			&& this.grid[i+1][j-1].hasMine)
		{
			++count;
		}
			
		//Left neighbour
		if (j > 0 && this.grid[i][j-1].hasMine) 
		{
			++count;
		}
		
		//Top left neighbour
		if (i > 0 && j > 0 && this.grid[i-1][j-1].hasMine) 
		{
			++count;
		}
		
		return count;
	},
	
	/** check if the field in the ith row and the jth column has mine */
	isMineField : function(i, j)
	{
		//If the position is not valid
		if (i<0 || j<0 || i>=this.grid.length || j>=this.grid[i].length)
			return 0;
		
		return this.grid[i][j].hasMine;
		
	},
	
	/** Counts all the opened fields in the MineSweeper table */
	countOpenedFileds : function()
	{
		var count = 0;
		for (var i=0; i<this.grid.length; ++i)
		{
			for (var j=0; j<this.grid[i].length; ++j)
			{
				if (this.grid[i][j].isOpened())
					++count;
			}
		}
		return count;
	},
	
	/** Generate Minesweeper table header with mine counter, time counter and smiley sun.
	 *   Runs when the main page loading and in every onmousedown event.
 	 *  @return HTML DOM <thead> object
	 */
	createHeader: function()
	{
		var thead = document.createElement("thead");
		
		var row = document.createElement("tr");
		row.style.backgroundColor = 'lightgrey';
		row.style.height = "50px";
		
		var thScore = document.createElement("th");
		thScore.id = "scoreboard";
		thScore.colSpan = Math.floor(msColumns/3);
		var mineDiv = ScoreCounter.getScoreDivElement(MineSweeper.remainingMines); 
		thScore.appendChild(mineDiv);
		
		var thSun = document.createElement("th");
		thSun.id = "sunhead";
		thSun.colSpan = Math.floor(msColumns - 2*Math.floor(msColumns/3));
		
		var smileyDiv = document.createElement("div");
		if (this.isPlayerDied)
			smileyDiv.style.backgroundImage = "url('Images/sad.png')";
		else if (this.isPlayerWin)
			smileyDiv.style.backgroundImage = "url('Images/win.jpg')";
		else
			smileyDiv.style.backgroundImage = "url('Images/smile.png')";
		
		smileyDiv.style.backgroundSize = "cover";
		smileyDiv.style.height = "50px";
		smileyDiv.style.width = "50px";
		smileyDiv.style.margin = "0 auto 0";
		
		smileyDiv.onclick = function() 
		{ 
			TimeCounter.stopClock();
			TimeCounter.resetClock();
			MineSweeper.create(targetDiv.id); 
		}
		
		thSun.appendChild(smileyDiv);
		
		var thTime = document.createElement("th");
		thTime.id = "timeboard";
		thTime.colSpan = Math.floor(msColumns/3);
		
		thTime.appendChild(TimeCounter.getTimerDivElement());
		
		row.appendChild(thScore);
		row.appendChild(thSun);
		row.appendChild(thTime);
		
		thead.appendChild(row);
		
		return thead;
	},
	
	/** Opening the field. Runs in left click event. */
	openField: function(row, col)
	{
		var neighbourCount = MineSweeper.countNeigbourMines(row, col);
		
		this.grid[row][col].opened = true;		

		this.grid[row][col].getButton().style.backgroundImage = "url('Images/"+neighbourCount+".png')";
		this.grid[row][col].getButton().style.backgroundSize = "cover";

		//if it's not empty, we don't need to flood fill
		if (neighbourCount > 0)
			return;
		
		var queue = [];
		queue.push({x: row, y: col});
			
		while (queue.length > 0)
		{
			var nextFieldCoord = queue.pop();
			
			var x = nextFieldCoord.x;
			var y = nextFieldCoord.y;
						
			//left neighbour 
			if (x > 0 && !this.grid[x-1][y].opened )
			{
				this.grid[x-1][y].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x-1, y);
				
				if (MineSweeper.countNeigbourMines(x-1, y) === 0)
					queue.push({x: x-1, y: y});
			}
			//right neighbour 			
			if (x < this.grid.length-1 && !this.grid[x+1][y].opened )
			{
				this.grid[x+1][y].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x+1, y);
				
				if (MineSweeper.countNeigbourMines(x+1, y) === 0)
					queue.push({x: x+1, y: y});

			}
			//top neighbour 			
			if (y > 0 && !this.grid[x][y-1].opened )
			{
				this.grid[x][y-1].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x, y-1);
								
				if (MineSweeper.countNeigbourMines(x, y-1) === 0)
					queue.push({x: x, y: y-1});
			}
			//bottom neighbour 			
			if (y < this.grid[x].length-1 && !this.grid[x][y+1].opened )
			{
				this.grid[x][y+1].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x, y+1);
				
				if (MineSweeper.countNeigbourMines(x, y+1) === 0)
					queue.push({x: x, y: y+1});

			}
			//top left neighbour 
			if (x > 0 && y > 0 && !this.grid[x-1][y-1].opened )
			{
				this.grid[x-1][y-1].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x-1, y-1);
				
				if (MineSweeper.countNeigbourMines(x-1, y-1) === 0)
					queue.push({x: x-1, y: y-1});
			}
			//top right neighbour 			
			if (x < this.grid.length-1 && y > 0 && !this.grid[x+1][y-1].opened )
			{
				this.grid[x+1][y-1].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x+1, y-1);
				
				if (MineSweeper.countNeigbourMines(x+1, y-1) === 0)
					queue.push({x: x+1, y: y-1});

			}
			//bottom left neighbour 
			if (x > 0 && y < this.grid[x].length-1 && !this.grid[x-1][y+1].opened )
			{
				this.grid[x-1][y+1].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x-1, y+1);
				
				if (MineSweeper.countNeigbourMines(x-1, y+1) === 0)
					queue.push({x: x-1, y: y+1});
			}
			//bottom right neighbour 			
			if (x < this.grid.length-1 && y < this.grid[x].length-1 && !this.grid[x+1][y+1].opened )
			{
				this.grid[x+1][y+1].opened = true;		
				neighbourCount = MineSweeper.countNeigbourMines(x+1, y+1);
				
				if (MineSweeper.countNeigbourMines(x+1, y+1) === 0)
					queue.push({x: x+1, y: y+1});
			}			
		}	
	},
	
	/** Open all fields in MineSweeper table */
	openAllFields: function() 
	{
		for (var i=0; i<this.grid.length; ++i)
		{
			for (var j=0; j<this.grid[i].length; ++j) 
			{
				this.grid[i][j].opened = true;
			}
		}	
	},
		
	getTargetDiv : function()
	{
		return targetDiv.id;
	},
	
	/** Check if is there any openable field in table
   	 *  Openable = not opened and not contains mine
	 */
	hasOpenableField : function()
	{
		for (var i=0; i<this.grid.length; ++i)
		{
			for (var j=0; j<this.grid[i].length; ++j) 
			{
				if (!this.grid[i][j].opened && !this.grid[i][j].hasMine)
				{
					return true;
				}
			}
		}
		return false;
	}
}
