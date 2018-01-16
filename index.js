

var Direction = {
    Up: 1,
    Right: 2,
    Down: 3,
    Left: 4
}

function changeDirection(oldDirection) {
    switch(oldDirection){
        case Direction.Up:
        case Direction.Right:
        case Direction.Down:
            return oldDirection + 1;
        case Direction.Left:
            return Direction.Up;
        default:
            throw new Error('bad direction');
    }
}

function getNextPoint(point, direction) {
    var x = point.x;
    var y = point.y;
    switch(direction) {
        case Direction.Up:
            return {x: x, y: y - 1}
        case Direction.Right:
            return {x: x + 1, y: y}
        case Direction.Down:
            return {x: x, y: y + 1}
        case Direction.Left:
            return {x: x - 1, y: y}
        default: 
            throw new Error('bad direction!')
    }
}

function getPotentialTurnPoint(point, direction) {
    var newDirection = changeDirection(direction);
    return getNextPoint(point, newDirection);
}

function isEmpty(allPoints, targetPoint) {
    for(var i = 0; i < allPoints.length; i++) {
        var point = allPoints[i];
        if(pointsAreEqual(point, targetPoint)){
            return false;
        }
    }
    return true;
}

function pointsAreEqual(point1, point2) {
    if(!point1 || !point2){
        return false;
    }
    return point1.x === point2.x && point1.y === point2.y;
}

function shouldTurn(points, currentPoint, direction) {
    var targetPoint = getPotentialTurnPoint(currentPoint, direction);
    var empty = isEmpty(points, targetPoint);
    return empty;
}

function findBiggestAbsValue(points, propertyName) {
    return points.reduce(function(biggest, point){
        var current = Math.abs(point[propertyName]);
        if(current > biggest){
            return current;
        } else {
            return biggest;
        }
    }, 0);
}

function findBiggestX(points) {
    return findBiggestAbsValue(points, 'x');
}

function findBiggestY(points) {
    return findBiggestAbsValue(points, 'y');
}

function shiftPoints(points) {
    var xOffset = findBiggestX(points);
    var yOffset = findBiggestY(points);
    return points.map(function(point){
        return {
            x: point.x + xOffset,
            y: point.y + yOffset
        }
    })
}

function createGrid(points) {
    points = shiftPoints(points)
    var grid = [];
    points.forEach(function(point, index) {
        var x = point.x;
        var y = point.y;
        if(!grid[y]){
            grid[y] = []
        }
        grid[y][x] = index;
    });
    return grid;
}

function pad(num) {
    var PAD_AMOUNT = 2;
    var strNumber = String(num);
    while(strNumber.length < PAD_AMOUNT){
        strNumber += ' ';
    }
    return strNumber;
}

function padRow(row){
    return row.map(pad);
}

function createString(points) {
    var grid = createGrid(points);
    return grid.map(function(row){
        return padRow(row).join(' ');
    });
}

function createSpiral(size) {

    var direction = Direction.Right;
    var points = [{x: 0, y: 0}, {x: 1, y: 0}];
    var currrentX = 0;
    var currentY = 0;

    for(currentPoint = 1; currentPoint <= size; currentPoint ++) {
        var point = points[currentPoint];
        if(shouldTurn(points, point, direction)){
            direction = changeDirection(direction);
        } 
        var newPoint = getNextPoint(point, direction);
        points.push(newPoint);
    }

    return createString(points);
}

function main() {
    var points = createSpiral(50); 
    console.log(points);
}

main();