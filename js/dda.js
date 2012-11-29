/**
 * DDA line algorithm.
 *
 * @author playchilla.com
 */
var DDA = function(cellSizeX, cellSizeY) {
    var _cellSizeX = cellSizeX,
        _cellSizeY = cellSizeY;

    function run(x1, y1, x2, y2, map) {
        var gridPos = map.pos2cell(x1, y1);
            gridPosX = gridPos.x, // Math.round(x1 / _cellSizeX),
            gridPosY = gridPos.y; // Math.round(y1 / _cellSizeY);

        // Cell contents collidable?
        if (map.isCollidable(gridPosX, gridPosY)) {
            return [];
        }
        
        var dirX = x2 - x1;
        var dirY = y2 - y1;
        var distSqr = dirX * dirX + dirY * dirY;
        if (distSqr < 0.00000001) {
            return [];
        }
        
        var nf = 1 / Math.sqrt(distSqr);
        dirX *= nf;
        dirY *= nf;

        var deltaX = _cellSizeX / Math.abs(dirX);
        var deltaY = _cellSizeY / Math.abs(dirY);

        var maxX = gridPosX * _cellSizeX - x1;
        var maxY = gridPosY * _cellSizeY - y1;
        if (dirX >= 0) maxX += _cellSizeX;
        if (dirY >= 0) maxY += _cellSizeY;
        maxX /= dirX;
        maxY /= dirY;

        var stepX = dirX < 0 ? -1 : 1;
        var stepY = dirY < 0 ? -1 : 1;
        var gridGoalX = Math.floor(x2 / _cellSizeX);
        var gridGoalY = Math.floor(y2 / _cellSizeY);
        
        var cellList = new Array();
        
        while (gridPosX != gridGoalX || gridPosY != gridGoalY) {
            if (maxX < maxY) {
                maxX += deltaX;
                gridPosX += stepX;
            }
            else {
                maxY += deltaY;
                gridPosY += stepY;
            }

            // Collision found.  Return cell list.
            if (map.isCollidable(gridPosX, gridPosY)) {
                return cellList;
            }
            
            // No collision found.  Add cell to list.
            else {
                cellList.push({
                    "x": gridPosX,
                    "y": gridPosY,
                    "type": "path"
                });
            }
        }
        
        // No collisions found.  Return cells.
        return cellList;
    }

    // Return public interface.
    return {
        "run": run
    }
}