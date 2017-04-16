var msRows = 2;
var msColumns = 5;
var mineCount = 15;
var targetDiv = null;

window.oncontextmenu = function() { 
	return false; 
}

var MineSweeper = {
	
	remainingMines : mineCount,
	grid : [],
	
	generateGrid : function(rows, columns)
	{
		console.log(rows+" row " + columns + " columns");
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
			var rand = Math.round(Math.random()*(rows*columns));
			if (this.grid[Math.floor(rand/rows)][Math.floor(rand)%rows] === 0)
			{
				this.grid[Math.floor(rand/rows)][Math.floor(rand)%rows] = 1;
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
				
				var msButton = new MineSweeperButton(i,j, false);
				msButton.appendTo(column);
			}
			
			table.appendChild(row);
		}
		targetDiv.appendChild(table);				
	}	
}
