var MapRenderer = function (canvas, map) {
    var ctx = canvas.getContext("2d");
    var tileTemplates = {
        "passable": {
            fill: "#fff",
            stroke: false
        },
        "collidable": {
            fill: "#999",
            stroke: false
        },
        "path": {
            fill: false,
            stroke: "#ff0"
        }
    }
    
    function drawTile(x, y, style) {
        var pos = map.cell2pos(x, y);
        if(style.fill) {
            ctx.fillStyle = style.fill;
            ctx.fillRect(pos.x, pos.y, map.cellsize, map.cellsize);
            ctx.fill();
        }
        if (style.stroke) {
            ctx.strokeStyle = style.stroke;
            ctx.stroke();
        }
    }
    
    function drawMap(map) {
        var x = 0,
            y = 0;
        for (x; x<map.width; x++) {
            for (y; y<map.height; y++) {
                var style = tileStyles[map.tile(x, y)];
                drawTile(x, y, style);
            }
        }
    }
    
    drawMap();
    
    function drawLine(x1, y1, x2, y2) {
        // TODO
    }
    
    function drawCellList(cellList) {
        var len = cellList.len;
        for (var i=0; i<len; i++) {
            var c = cellList[i],
                style = tileStyles[map.tile(c.x, c.y).type];
            drawTile(x, y, style);
        }
    }
    
    function update(x1, y1, x2, y2, cellList) {
        ctx.restore();
        drawCellList(cellList);
        drawPath(x1, y1, x2, y2);
        drawLine(x1, y1, x2, y2);
    }
    
    return {
        "update": update
    }
}