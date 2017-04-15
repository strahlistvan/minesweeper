var msWidth = 10;
var msHeight = 10;

var MineSweeper = {
	
	errorMessage : function(errorText)
	{
		alert(errorText);
		console.log(errorText);
	},
	
	create: function(parentId)
	{
		var _targetDiv = null;
		_targetDiv = document.getElementById(parentId);
		
		if (!_targetDiv) 
			this.errorMessage("Failed to create MineSweeper. Element not found with ID "+parentId);
	
		var table = document.createElement("table");
		for (var i=0; i<msWidth; ++i)
		{
			var row = document.createElement("tr");
			for (var j=0; j<msHeight; ++j)
			{
				var column = document.createElement("td");
				var msButton = new MineSweeperButton(i,j, false);
				row.appendChild(msButton.getHtmlButton());
			}
			
			table.appendChild(row);
		}
		_targetDiv.appendChild(table);				
	}	
}
