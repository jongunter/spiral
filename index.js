



var Direction = {
    Up: 1,
    Right: 2,
    Down: 3,
    Left: 4
}



class Point {

    constructor(x, y){
        if(isNaN(x)){
            throw new Error('invalid x');
        }
        if(isNaN(y)){
            throw new Error('invalid y')
        }
        this.x = x;
        this.y = y;
    }

    equals(point) {
        if(!point){
            return false;
        }
        return this.x === point.x && this.y === point.y;
    }

    getNext(direction) {
        switch(direction) {
            case Direction.Up:
                return new Point(this.x, this.y - 1);
            case Direction.Right:
                return new Point(this.x + 1, this.y);
            case Direction.Down:
                return new Point(this.x, this.y + 1);
            case Direction.Left:
                return new Point(this.x -1, this.y);
            default: 
                throw new Error('bad direction!')
        }
    }

    get

}

class PointCollection {

    constructor(points) {
        if(!points) {
            points = [];
        }
        return this._points = points;
    }

    add(point) {
        this._points.push(point)
    }

    getPointAt(index) {
        return this_points[index];
    }

    isEmpty(targetPoint) {
        for(var i = 0; i < this._points.length; i++) {
            var point = getPointAt(i);
            if(point.equals(targetPoint)){
                return false;
            }
        }
        return true;
    }

    toNonNegativeCollection(points) {
        var xOffset = this._getBiggestX(points);
        var yOffset = this._getBiggestY(points);
        var nextArray = this.points.map((point) => {
            return new Point(point.x + xOffset, point.y + yOffset);
        });
        return new PointCollection(nextArray);
    }

    _getBiggestX(points) {
        return this._getBiggestAbsValue('x');
    }
    
    _getBiggestY(points) {
        return this._getBiggestAbsValue('y');
    }

    _getBiggestAbsValue(propertyName) {
        return this._points.reduce(function(biggest, point){
            var current = Math.abs(point[propertyName]);
            if(current > biggest){
                return current;
            } else {
                return biggest;
            }
        }, 0);
    }

}

class Spiral {

    constructor(size) {
        this._assertValidSize(size)
        this.size = _convertToWholeNumber(size);
        this.points = new PointCollection();
        this.currentDirection = Direction.Right;

        this.points.add(new Point(0, 0));
        if(size === 0) {
            return;
        }

        this.points.add(new Point(1, 0));
        if(size === 1) {
            return; 
        }
        
        for(this.currentPoint = 1; this.currentPoint < size; this.currentPoint ++) {
            var point = this.getCurrentPoint();
            if(shouldTurn(points, point, direction)){
                direction = changeDirection(direction);
            } 
            var newPoint = getNextPoint(point, direction);
            points.push(newPoint);
        }

        return createString(points);
    }

    getCurrentPoint(){
        return this.points.getPointAt(this.currentPoint);
    }

    get2dArray(){

    }

    shouldTurn() {
        var targetPoint = _getPotentialTurnPoint();
        var isEmpty = this.points.isEmpty(targetPoint);
        return isEmpty;
    }

    getPotentialTurnPoint() {
        var newDirection = changeDirection(this.currentDirection);
        return getNextPoint(this.currentPoint, newDirection);
    }

   changeDirection(oldDirection) {
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

    

    _assertValidSize(size){
        if(isNaN(size) || size === null){
            throw new Erorr("Size must be a number")
        }
        if(size < 0){
            throw new Error("Size must be 0 or greater")
        }
    }

    _convertToWholeNumber(size) {
        return parseInt(size);
    }

    static isSprial(spiral){
        return spiral instanceof Spiral;
    }

}

class SpiralStringRenderer {

    constructor(spiral){
        if(!Spiral.isSprial(spiral)) {
            throw new Error("invalid spiral");
        }
        this.spiral = spirall;
    }

    render(){
        var grid = createGrid(points);
        console.log(grid);
        var rows = grid.map(function(row){
            return padRow(row).join(' ');
        });
        return rows.join('\n')
    }

    _fillEmptySpaes(grid) {
        for(let i = 0; i < grid.length; i++){
            let row = grid[i];
            if(row){
                for(let j = 0; j < row.length; j++) {
                    if(!grid[i][j] && grid[i][j] !== 0){
                        grid[i][j] = null;
                    }
                }
            }
        }
        return grid;
    }

    _createGrid(points) {
        points =  this._shiftPoints(points)
        var grid = [];
        points.forEach(function(point, index) {
            var x = point.x;
            var y = point.y;
            if(!grid[y]){
                grid[y] = []
            }
            grid[y][x] = index;
        });
        fillEmptySpaes(grid);
        return grid;
    }

    _getSprialSize(){
        return this.spiral.size;
    }

    _createEmptyBlock(size){
        let block = '';
        for(let i = 0; i < size, i++){
            block += ' ';
        }
        return block;
    }

    _padRow(row){
        return row.map(cell => this._padCell(cell));
    }

    _padCell(cell) {
        var PAD_AMOUNT = this._getSprialSize();
    
        if(cell === null){
            return _createEmptyBlock(size);
        }
    
        var strNumber = String(cell);
        while(strNumber.length < PAD_AMOUNT){
            strNumber += ' ';
        }
        return strNumber;
    }

}