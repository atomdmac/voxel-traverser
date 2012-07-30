Map = function(container, w, h, cellsize) {
	var me = this;
	
	// Store dimensions of canvas so we can quickly access them later.
	var cw = w*cellsize;
	var ch = h*cellsize;
	
	me.ctx = $(container)[0].getContext("2d");
	me.map = [];
	
	/** 
	 * Update the map's visual state procedurally.
	 */
	me.draw = function draw() {
		for(var x=0; x<w; x++) {
			for(var y=0; y<h; y++) {
				var cell = me.map[x][y];
				me.drawCell(cell.x, cell.y, w, h);
			}
		}
	}
	
	/** 
	 * Draw a single cell at the given location.
	 */
	me.drawCell = function drawCell(x, y) {
		me.ctx.strokeRect(x,y,cellsize,cellsize);
	}
	
	/** 
	 * Create a new cell object to store in the map.
	 */
	me.makeCell = function makeCell(x,y) {
		return {
			"x": x*cellsize,
			"y": y*cellsize,
			"col": x,
			"row": y,
			solid: false
		}
	}
	
	/**
	 * Return the cell object at the specified column and row.
	 */
	me.getCell = function getCell(col, row) {
		try {
			return me.map[col][row];
		} catch(e) {
			return false;
		}
	}
	
	/** 
	 * Returns the cell (column/row) that the given point falls within.
	 */
	me.posToCell = function posToCell(x, y) {
		if(x > cw) return null;
		if(y > ch) return null;
		
		var xcell = Math.floor(x/cellsize);
		var ycell = Math.floor(y/cellsize);
		
		return { 
			"x": xcell, 
			"y": ycell 
		};
	}
	
	/** 
	 * Returns the position of the given cell (column, row).
	 */
	me.cellToPos = function cellToPos(col, row) {
		if(col > w) return null;
		if(row > h) return null;
		
		return {
			"x": col * cellsize,
			"y": row * cellsize
		};
	}
	
	/**
	 * Return a Boolean value that indicate whether or not the given point is
	 * within the map.
	 */
	me.isInside = function isInside(x, y) {
		if(x > cw) return false;
		if(y > ch) return false;
		return true;
	}
	
	/**
	 * Initialize the map object.
	 */
	me.init = function init() {
		for(var x=0; x<w; x++) {
			me.map[x] = [];
			for(var y=0; y<h; y++) {
				me.map[x][y] = me.makeCell(x,y);
			}
		}
	}
	
	// Initialize this object automatically.
	me.init();
}