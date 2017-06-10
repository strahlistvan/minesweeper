var msRows = 10;
var msColumns = 10;
var mineCount = 20;
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
	
	repaintGrid: function(parentId) {
		
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
				
				var msField = this.grid[i][j];
				msField.appendTo(column);
			}
			
			tbody.appendChild(row);
		}
		
		table.appendChild(tbody);
		targetDiv.appendChild(table);				
		
		console.log("repaint grid");
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
	
	openField: function(row,  col)
	{
	//	var row = msField.getRowIndex();
	//	var col = msField.getColumnIndex();
		var neighbourCount = MineSweeper.countNeigbourMines(row, col);
		console.log(neighbourCount);
		
		//msField.opened = true;
		this.grid[row][col].opened = true;		

		this.grid[row][col].getButton().style.backgroundImage = "url('Images/"+neighbourCount+".png')";
		this.grid[row][col].getButton().style.backgroundSize = "cover";

		//if it's not empty, we don't need to flood fill
		if (neighbourCount > 0)
			return;
		
		console.log(this.grid[row][col].getButton());
		
		var queue = [];
		queue.push({x: row, y: col});
		
		
		while (queue.length > 0)
		{
			var nextFieldCoord = queue.pop();
			
		//	var topNB = (row > 0) ? this.grid[row-1][col] : null;
		//	var bottomNB = (row < this.grid.length - 1) ? this.grid[row+1][col] : null;
		//	var rightNB = (col < this.grid[row].length - 1) ? this.grid[row][col+1] : null;
		//	var leftNB = (col > 0) ? this.grid[row][col-1] : null;

			var x = nextFieldCoord.x;
			var y = nextFieldCoord.y;
			
			if (x > 0 && !this.grid[x-1][y].opened )
			{
				this.grid[x-1][y].opened = true;		

				this.grid[x-1][y].getButton().style.backgroundImage = "url('Images/0.png')";
				this.grid[x-1][y].getButton().style.backgroundSize = "cover";
				
				if (MineSweeper.countNeigbourMines(x-1, y) === 0)
					queue.push({x: x-1, y: y});
			}
			if (x < this.grid.length-1 && !this.grid[x+1][y].opened )
			{
				this.grid[x+1][y].opened = true;		

				this.grid[x+1][y].getButton().style.backgroundImage = "url('Images/0.png')";
				this.grid[x+1][y].getButton().style.backgroundSize = "cover";

				if (MineSweeper.countNeigbourMines(x+1, y) === 0)
					queue.push({x: x+1, y: y});

			}
			
			if (y > 0 && !this.grid[x][y-1].opened )
			{
				this.grid[x][y-1].opened = true;		

				this.grid[x][y-1].getButton().style.backgroundImage = "url('Images/0.png')";
				this.grid[x][y-1].getButton().style.backgroundSize = "cover";
				
				if (MineSweeper.countNeigbourMines(x, y-1) === 0)
					queue.push({x: x, y: y-1});
			}
			if (y < this.grid.length-1 && !this.grid[x][y+1].opened )
			{
				this.grid[x][y+1].opened = true;		

				this.grid[x][y+1].getButton().style.backgroundImage = "url('Images/0.png')";
				this.grid[x][y+1].getButton().style.backgroundSize = "cover";

				if (MineSweeper.countNeigbourMines(x, y+1) === 0)
					queue.push({x: x, y: y+1});

			}
			console.log(JSON.stringify(queue));
		}	
	}
}
