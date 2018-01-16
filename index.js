

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
        default:
            return Direction.Up;
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
    return getNextPoint(point, direction);
}

function isEmpty(allPoints, targetPoint) {
    for(var point of allPoints) {
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
    return isEmpty(targetPoint);
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

    return points;

}

function main() {
    var points = createSpiral(20); 
    console.log(points);
}

main();