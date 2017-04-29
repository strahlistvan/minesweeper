var msRows = 6;
var msColumns = 5;
var mineCount = 4;
var targetDiv = null;

window.oncontextmenu = function() { 
	return false; 
}

var MineSweeper = {
	
	remainingMines : mineCount,
	grid : [],
	
	generateGrid : function(rows, columns)
	{
		this.grid = new Array(rows);
		for (var i=0; i<rows; ++i)
		{
			this.grid[i] = new Array(columns);
			for (var j=0; j<columns; ++j) 
			{
				this.grid[i][j] = 0;
			}
		}
		
		//generating mines into random places
		var index = mineCount;
		while (index != 0)
		{
			var rand = Math.floor(Math.round(Math.random()*(rows*columns)));
			var rowIndex = Math.floor(rand/rows) ; 
			var colIndex = rand%rows;
			console.log("row: "+rowIndex + " column: " + colIndex);
			
			if (this.grid[colIndex][rowIndex] === 0)
			{
				this.grid[colIndex][rowIndex] = 1;
				--index;
			}
		}
		console.log(this.grid);
	},
	
	errorMessage : function(errorText)
	{
		alert(errorText);
		console.log(errorText);
	},
	
	create: function(parentId)
	{
		this.generateGrid(msRows, msColumns);
		
		targetDiv = null;
		targetDiv = document.getElementById(parentId);
		
		if (!targetDiv) 
			this.errorMessage("Failed to create MineSweeper. Element not found with ID "+parentId);
		
		targetDiv.innerHTML = '';
	
		var table = document.createElement("table");
		for (var i=0; i<msRows; ++i)
		{
			var row = document.createElement("tr");
			for (var j=0; j<msColumns; ++j)
			{
				var column = document.createElement("td");
				row.appendChild(column);
				
				var msButton = new MineSweeperButton(i, j, false);
				msButton.appendTo(column);
			}
			
			table.appendChild(row);
		}
		targetDiv.appendChild(table);				
	},
	
	countNeigbourMines: function(i, j)
	{
		var count = 0;
		
		//If the position is not valid
		if (i<0 || j<0 || i>=this.grid.length || j>=this.grid[i].length)
			return 0;
		
		//Top neighbour
		if (i > 0 && this.grid[i-1][j] === 1)
		{
			console.log(i+' row '+j+' column Top neighbour');
			++count;
		}
			
		//Top right neighbour
		if (i > 0 && j < this.grid[i-1].length - 1
		    && this.grid[i-1][j+1] === 1)
		{
			console.log(i+' row '+j+' column Top Right neighbour');
			++count;
		}
		
		//Right neighbour
		if (j < this.grid[i].length - 1 
			&& this.grid[i][j+1] === 1)
		{
			console.log(i+' row '+j+' column Right neighbour');
			++count;
		}
		
		//Bottom right neighbour
		if (i < this.grid.length - 1 && j < this.grid[i+1].length - 1  
			&& this.grid[i+1][j+1] === 1)
			{
				console.log(i+' row '+j+' column Bottom Right neighbour');
				++count;
			}
		
		//Bottom neighbour
		if (i < this.grid.length - 1
			&& this.grid[i+1][j] === 1)
			{
				console.log(i+' row '+j+' column Bottom neighbour');
				++count;
			}

		
		//Bottom left neighbour
		if (i < this.grid.length - 1 && j > 0
			&& this.grid[i+1][j-1] === 1)
		{
			console.log(i+' row '+j+' column Bottom Left neighbour');
			++count;
		}

			
		//Left neighbour
		if (j > 0 && this.grid[i][j-1] === 1) 
		{
			console.log(i+' row '+j+' column Left neighbour');
			++count;
		}
		
		//Top left neighbour
		if (i > 0 && j > 0 && this.grid[i-1][i-1] === 1) 
		{
			console.log(i+' row '+j+' column Top Left neighbour');
			++count;
		}
		
		return count;
	}
	
}
