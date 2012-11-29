/**
 * Map Object
 */
Map = function(width, height, cellsize) {
    var width, height, cellsize, mapArray;

/*
     * Convert screen/pixel coordinates to cell coordinates.
     */

    function pos2cell(x, y) {
        var cx = Math.floor(x / cellsize),
            cy = Math.floor(y / cellsize);
        return {
            "x": cx,
            "y": cy
        };
    }

/*
     * Convert cell coordinates to screen/pixel coordinates.
     */

    function cell2pos(x, y) {
        var px = x * cellsize,
            py = y * cellsize;
        return {
            "x": px,
            "y": py
        };
    }

/*
     * Get / set map tile.
     */

    function tile(x, y, tile) {
        if (x < 0 || x > width) {
            return undefined;
        }
        if (y < 0 || y > height) {
            return undefined;
        }
        if (tile !== null && typeof tile !== "undefined") {
            // Tiles are not collidable by default.
            tile.collidable = tile.collidable !== undefined ? tile.collidable : false;
            // Insert tile object.
            mapArray[x][y] = tile;
        }
        return mapArray[x][y];
    }

    function isCollidable(x, y) {
        return mapArray[x][y].collidable;
    }
    
    function inBounds(x, y) {
        if (x > 0 && x < width && y > 0 && y > height) {
            return true;
        } else {
            return false;
        }
    }

/*
     * Initialize the map.
     */

    function initMap(width, height) {
        mapArray = new Array();
        for (var x = 0; x < width; x++) {
            mapArray.push(new Array());
            for (var y = 0; y < height; y++) {
                mapArray[x].push(null);
            }
        }
    }

    // Do init.
    initMap(width, height);
    
    // Define getters / setters.
    this.__defineGetter("width", function () {
        return width;
    });
    this.__defineGetter("height", function () {
        return height;
    });
    this.__defineGetter("cellsize", function () {
        return cellsize;
    });
    
    // Return public interface.
    return {
        "tile": tile,
        "isCollidable": isCollidable,
        "cell2pos": cell2pos,
        "pos2cell": pos2cell
    }
}