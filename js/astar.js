var AStar = function (map) {
    // Constants
    var COST = 10,
        DIAG_COST = 14;
    
    // Variables.
    var openList   = [],
        closedList = [];
    
    // Find a path between the given cells.
    function findPath(x1, y1, x2, y2) {
        // TODO
        var start = map.tile(x1, y1),
            end = map.tile(x2, y2);
        
        // Make sure coords are legit.
        if (start === undefined || end === undefined) {
            return false;
        }
        if (start.type == "collidable" || end.type == "collidable") {
            return false;
        }
        
        // Add start node to open list.
        h = getHScore(x1, y1, x2, y2);
        openList.push(new AStarCell(x1, y1, g, h));
        
        // ... more code goes here.  Too tired to write more.
        
        // Return...something.  Not undefined.
        return undefined;
    }
    
    function tracePath(cell) {
        var path = [];
        while (cell.parent !== null) {
            path.push(cell);
            cell = cell.parent;
        }
        return path;
    }
    
    function sortByFScore(list) {
        return list.sort(function (a, b) {
            if (a.f > b.f) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    
    function getHScore(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(x2 - y2);
    }
    
    function getAdjacentCells(x, y) {
        var adjPos = [
                [-1, 0],
                [0, -1],
                [1, 0],
                [0, 1]
            ],
            cells = [],
            c;
        for (var p in adjPos) {
            var c = map.tile(x+p[0], y+p[1]);
            if (c !== undefined) {
                cells.push(c);
            }
        }
        return cells;
    }
    
    /**
     * Define's a traversable cell for pathfinding.
     */
    function AStarCell(x, y, g, h, parent) {
        
        // Coords
        this.__defineGetter__("x", function () {
            return x;
        });
        this.__defineGetter__("y", function () {
            return y;
        });
        
        // Parent
        this.__defineGetter__("parent", function () {
            return parent;
        });
        this.__defineSetter__("parent", function (newParent) {
            parent = newParent;
        });
        
        // F Score
        var f;
        this.__defineGetter__("f", function () {
            return f;
        });
        
        // G Score
        this.__defineGetter__("g", function () {
            return g;
        });
        this.__defineSetter__("g", function (newG) {
            g = newG;
            f = g + h;
        });
        
        // H Score
        this.__defineGetter__("h", function () {
            return h;
        });
        this.__defineSetter__("h", function (newH) {
            h = newH;
            f = g + h;
        });
        
        return this;
    }
}