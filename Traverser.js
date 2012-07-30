Traverser = function(container, w, h, cellsize, map) {
	var me = this;
	
	// Store dimensions of canvas so we can quickly access them later.
	var cw = w*cellsize;
	var ch = h*cellsize;
	
	/**
	 * Return tha first border that the given ray will run into first.
	 */
	me.closestBorder = function closestBorder(p, v) {
		var x = Math.floor(p.x / cellsize) * cellsize;
		var y = Math.floor(p.y / cellsize) * cellsize;
		
		if(v.x > 0) {
			x += cellsize;
		}
		
		if(v.y > 0) {
			y += cellsize;
		}
		
		return new Vector2d(x, y);
	}
	
	/**
	 * Get the distance along the ray we must travel to have crossed a cell
	 * vertically.
	 */
	me.maxX = function maxX(v, cellsize) {
		v.len(cellsize);
		return v;
	}
	
	/**
	 * Get the path from start position to end position.
	 */
	me.trace = function trace(start, end) {
		var slope = end.clone().sub(start).normalize();
		
		var origin = map.posToCell(start.x, start.y);
		var closest = me.closestBorder(start, slope);
		var xMax = closest.x;
		var yMax = closest.y;
		
		if(slope.slope() == 0) {
			yMax = 0;
		} else if(slope.slope() == null) {
			xMax = 0;
		}
		
		var xDelta;
		if(slope.x == 0) {
			xDelta = 0;
		} else {
			xDelta = slope.clone();
			xDelta = xDelta.lenx(cellsize).len();
		}
		
		var yDelta;
		if(slope.y == 0) {
			yDelta = 0;
		} else {
			yDelta = slope.clone();
			yDelta = yDelta.leny(cellsize).len();
		}
		
		var xStep = slope.x>0 ? 1 : -1;
		var yStep = slope.y>0 ? 1 : -1;
		
		var xcell = origin.x;
		var ycell = origin.y;
		
		// DEBUG : //
		console.log(
			"starting in cell: ", xcell, ", ", ycell
		);
		
		// Compute the path.
		var path = [origin];
		
		// Safety to keep loop from accidentally going infinitely.
		var safety = 0;
		var safetyMax = 1000;
		
		while(map.getCell(xcell, ycell)) {
			
			// DEBUG: //
			console.log(
				"xStep: ", xStep,
				"yStep: ", yStep,
				"xMax", xMax,
				"yMax: ", yMax,
				"xDelta: ", xDelta,
				"yDelta: ", yDelta,
				"slope: ", slope
			);
			
			if(xMax < yMax) {
				console.log("shameful business");
				xMax += xDelta;
				xcell += xStep;
			}
			
			else {
				yMax += yDelta;
				ycell += yStep;
			}
			
			// DEBUG : //
			console.log(
				"xcell: ", xcell,
				"ycell: ", ycell
			);
			console.log(
				"--AFTER--",
				"xStep: ", xStep,
				"yStep: ", yStep,
				"xMax", xMax,
				"yMax: ", yMax,
				"xDelta: ", xDelta,
				"yDelta: ", yDelta,
				"slope: ", slope
			);
			
			path.push(map.getCell(xcell, ycell));
			
			// Make sure we never loop forever.
			safety++;
			if(safety>safetyMax) {
				throw Error("Traverser: Trace() loop went haywire!");
				return;
			}
		}
		
		return path;
	}
	
	me.drawCell = function drawCell(x, y) {
		var dotw = cellsize*0.10;
		var doth = cellsize*0.10;
		var dotx = cellsize/2-(dotw/2);
		var doty = cellsize/2-(doth/2);
		
		dotx += x;
		doty += y;
		
		me.ctx.strokeRect(dotx, doty, dotw, doth);
	}
	
	/**
	 * Draw the current state to the canvas procedurally.
	 */
	me.draw = function draw(path) {
		for(var i=0; i<path.length-1; i++) {
			var cell = path[i];
			me.drawCell(cell.x,cell.y);
		}
	}
	
	/**
	 * Update the path and display.
	 */
	me.update = function update() {
		var path = me.trace(me.start, me.end);
		console.log(path);
		me.draw(path);
	}
	
	me.init = function init() {
		me.ctx = $(container)[0].getContext("2d");
		
		// Define start and ending positions.
		me.start = new Vector2d(25, 25);
		me.end = new Vector2d(25, 500);
	}
	
	// Automatically initialize.
	me.init();
}