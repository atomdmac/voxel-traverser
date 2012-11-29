var MapRenderer = function (canvas, map) {
    var ctx = canvas.getContext("2d"),
        stage = {
            width: map.width * map.cellsize,
            height: map.height * map.cellsize
        },
        tileStyles = {
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
            stroke: "#ff0000"
        }
    };
    
    function drawTile(x, y, style) {     
        var pos = map.cell2pos(x, y);
        if(style.fill) {
            console.log("Filling ", x , ", ", y);
            ctx.fillStyle = style.fill;
            ctx.fillRect(pos.x, pos.y, map.cellsize, map.cellsize);
            ctx.fill();
        }
        if (style.stroke) {
            console.log("Stroke ", x,  ", ", y);
            ctx.strokeStyle = style.stroke;
            ctx.beginPath();
            ctx.strokeRect(pos.x, pos.y, map.cellsize, map.cellsize);
            ctx.stroke();
        }
    }
    
    function drawMap(map) {
        var x = 0,
            y = 0;
        for (x=0; x<map.width; x++) {
            for (y=0; y<map.height; y++) {
                var style = tileStyles[map.tile(x, y).type];
                drawTile(x, y, style);
            }
        }
    }
    
    function drawLine(x1, y1, x2, y2) {
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
    }
    
    function drawCellList(cellList) { 
        var len = cellList.length;
        for (var i=0; i<len; i++) {
            var c = cellList[i],
                style = tileStyles[c.type];
                console.log("style = ", style);
                drawTile(c.x, c.y, style);
        }
    }
    
    function update(x1, y1, x2, y2, cellList) {
        ctx.clearRect(0, 0 , stage.width, stage.height);
        drawMap(map);
        drawLine(x1, y1, x2, y2);
        drawCellList(cellList);
    }
    
    // Draw initial map state.
    drawMap(map);
    
    return {
        "update": update
    }
}