var msWidth = 10;
var msHeight = 10;
var mineCount = 20;
var targetDiv = null;

window.oncontextmenu = function() { 
	return false; 
}
;

var MineSweeper = {
	
	remainingMines : mineCount,
	
	errorMessage : function(errorText)
	{
		alert(errorText);
		console.log(errorText);
	},
	
	create: function(parentId)
	{
		targetDiv = null;
		targetDiv = document.getElementById(parentId);
		
		if (!targetDiv) 
			this.errorMessage("Failed to create MineSweeper. Element not found with ID "+parentId);
		
		targetDiv.innerHTML = '';
	
		var table = document.createElement("table");
		for (var i=0; i<msWidth; ++i)
		{
			var row = document.createElement("tr");
			for (var j=0; j<msHeight; ++j)
			{
				var column = document.createElement("td");
				row.appendChild(column);
				
				var msButton = new MineSweeperButton(i,j, false);
				msButton.appendTo(column);
			//	column.appendChild(msButton.getHtmlButton());
			}
			
			table.appendChild(row);
		}
		targetDiv.appendChild(table);				
	}	
}

//window.onmousedown = function() {
//	targetDiv.parentElement.innerHTML = '';
//	MineSweeper.create(targetDiv);
//}