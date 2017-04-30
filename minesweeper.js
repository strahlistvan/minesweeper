var msRows = 5;
var msColumns = 8;
var mineCount = 6;
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
				this.grid[i][j] = new MineSweeperField(i, j, false);;
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
			
			if (!this.grid[colIndex][rowIndex].hasMine)
			{
				this.grid[colIndex][rowIndex].hasMine = true;
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
	
	countNeigbourMines: function(i, j)
	{
		var count = 0;
		
		//If the position is not valid
		if (i<0 || j<0 || i>=this.grid.length || j>=this.grid[i].length)
			return 0;
		
		//Top neighbour
		if (i > 0 && this.grid[i-1][j].hasMine)
		{
			console.log(i+' row '+j+' column Top neighbour');
			++count;
		}
			
		//Top right neighbour
		if (i > 0 && j < this.grid[i-1].length - 1
		    && this.grid[i-1][j+1].hasMine)
		{
			console.log(i+' row '+j+' column Top Right neighbour');
			++count;
		}
		
		//Right neighbour
		if (j < this.grid[i].length - 1 
			&& this.grid[i][j+1].hasMine)
		{
			console.log(i+' row '+j+' column Right neighbour');
			++count;
		}
		
		//Bottom right neighbour
		if (i < this.grid.length - 1 && j < this.grid[i+1].length - 1  
			&& this.grid[i+1][j+1].hasMine)
			{
				console.log(i+' row '+j+' column Bottom Right neighbour');
				++count;
			}
		
		//Bottom neighbour
		if (i < this.grid.length - 1
			&& this.grid[i+1][j].hasMine)
			{
				console.log(i+' row '+j+' column Bottom neighbour');
				++count;
			}
	
		//Bottom left neighbour
		if (i < this.grid.length - 1 && j > 0
			&& this.grid[i+1][j-1].hasMine)
		{
			console.log(i+' row '+j+' column Bottom Left neighbour');
			++count;
		}
			
		//Left neighbour
		if (j > 0 && this.grid[i][j-1].hasMine) 
		{
			console.log(i+' row '+j+' column Left neighbour');
			++count;
		}
		
		//Top left neighbour
		if (i > 0 && j > 0 && this.grid[i-1][i-1].hasMine) 
		{
			console.log(i+' row '+j+' column Top Left neighbour');
			++count;
		}
		
		return count;
	},
	
	createHeader: function()
	{
		var thead = document.createElement("thead");
		
		var row = document.createElement("tr");
		row.style.backgroundColor = 'lightgrey';
		row.style.height = "50px";
		
		var thScore = document.createElement("th");
		thScore.colSpan = Math.floor(msColumns/3);
		thScore.innerHTML = this.remainingMines;
		
		var thSun = document.createElement("th");
		thSun.colSpan = Math.floor(msColumns - 2*Math.floor(msColumns/3));
		
		var smileyDiv = document.createElement("div");
		smileyDiv.style.backgroundImage = "url('Images/smile.png')";
		smileyDiv.style.backgroundSize = "cover";
		smileyDiv.style.height = "50px";
		smileyDiv.style.width = "50px";
		smileyDiv.style.margin = "0 auto 0";
		thSun.appendChild(smileyDiv);
		
		var thTime = document.createElement("th");
		thTime.colSpan = Math.floor(msColumns/3);
		thTime.innerHTML = "0:00"
		
		row.appendChild(thScore);
		row.appendChild(thSun);
		row.appendChild(thTime);
		
		thead.appendChild(row);
		
		return thead;
	},
	
	openField: function(msField)
	{
		
		var row = msField.getRowIndex();
		var col = msField.getColumnIndex();
		var neighbourCount = MineSweeper.countNeigbourMines(row, col);
					
		msField.getButton().style.backgroundImage = "url('Images/"+neighbourCount+".png')";
		msField.getButton().style.backgroundSize = "cover";
		msField.opened = true;
		
		if (neighbourCount > 0)
			return;
		
	   console.log(row+","+col+" field is zero");
		//Get all neighbours
		var topNB = (row > 0) ? this.grid[row-1][col] : null;
		var bottomNB = (row < this.grid.length - 1) ? this.grid[row+1][col] : null;
//TODO: Blank areas (flood fill)	
//		if (topNB && !topNB.isOpened())
//			this.openField(topNB);
//		if (bottomNB && !bottomNB.isOpened())
//			this.openField(bottomNB);
	}
	
}
