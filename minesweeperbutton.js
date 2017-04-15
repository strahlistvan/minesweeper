window.oncontextmenu = function() { return false; };

function MineSweeperButton(rowIndex, columnIndex, hasMine) 
{
	this.rowIndex = rowIndex;
	this.columnIndex = columnIndex;
	this.hasMine = hasMine;
	
	this.getHtmlButton = function() 
	{
		var msbtn = document.createElement("button");
		msbtn.onmousedown = function(evt) {
			var isRight = false;
			
			if ("which" in evt)
				isRight = (evt.which == 3);
			else if ("button" in evt)
				isRight = (evt.button == 3);
		alert("Right mouse button clicked: " + isRight);
		}
		msbtn.style.width = "20px";
		msbtn.style.height = "20px";
		return msbtn;
	}
	
}