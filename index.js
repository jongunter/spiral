/** Enum indicationg directions on a grid */
var Direction = {
    Up: 1,
    Right: 2,
    Down: 3,
    Left: 4
}

/** An (x,y) point on a grid where x is left-to-right and y is up-to-down */
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

    /** Returns true if this point has the same x and y as another point */
    equals(point) {
        if(!Point.isValidPoint(point)){
            return false;
        }
        return this.x === point.x && this.y === point.y;
    }

    /** When given a direction, shows the point adjacent to this point */
    getNextPoint(direction) {
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

    /** Returns true if a point is valid */
    static isValidPoint(point){
        return Boolean(point) && !isNaN(point.x) && !isNaN(point.y);
    }

}

/** A path of of (x,y) points on a grid. */
class PointCollection {

    constructor(points) {
        if(!points) {
            points = [];
        }
        this._points = points;
    }

    /** Adds a point to the group */
   add(point) {
        this._points.push(point)
    }

    /** Get a point at the specified index in a group (points are indexed in the order they are added, starting at 0) */
    getPointAt(index) {
        return this._points[index];
    }

    /** Returns true if the collection contains a certain point */
    contains(targetPoint) {
        if(!Point.isValidPoint(targetPoint)){
            throw new Error('invalid point')
        }
        for(var i = 0; i < this._points.length; i++) {
            var point = this.getPointAt(i);
            if(point.equals(targetPoint)){
                return true;
            }
        }
        return false;
    }

    /** 
     * Returns a new PointCollection with all x and y values adjusted so that they are >= 0. 
     * This can be useful because you may not want negative points when plotting them onto a grid UI. 
     * */
    toNonNegativeCollection() {
        var xOffset = this._getBiggestX();
        var yOffset = this._getBiggestY();
        var nextArray = this._points.map(point => {
            return new Point(point.x + xOffset, point.y + yOffset);
        });
        return new PointCollection(nextArray);
    }

    /** 
     * Converts the PointCollection in an array of Point objects. 
     * Modifying the array will not modify the source PointCollection.
     * */
    toArray() {
        return [
            ...this.toNonNegativeCollection()._points
        ]
    }

    /**
     * Converts the PointCollection into a 2D array with each point's index plotted in the array.
     * The outer array indexes are rows #s (y) and the inner array indexes are the column #s (x).
     * Any point not contained the collection will have its grid square populated as null.
     */
    toGrid(){
        let points = this.toArray();
        let grid = this._createGrid(points);
        return this._fillEmptySpaces(grid);
    }

    // PRIVATE METHODS

    /** Utility method for filling a 2D array with nulls in empty spaces */
    _fillEmptySpaces(grid) {
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

    /** 
     * Utility method for converting an array of points into a 2D array.
     * The point indexes will be plotted on the proper (x,y) coordiantes, and empty spaces will be undefined.
     * */
    _createGrid(points) {
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

    /** Returns the biggest x absolute value in the entire collection */
    _getBiggestX() {
        return this._getBiggestAbsValue('x');
    }
    
    /** Returns the biggest y absolute value in the entire collection */
    _getBiggestY() {
        return this._getBiggestAbsValue('y');
    }

    /** Returns the biggest x or y absolute value in the entire collection */
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

/** Class that generates a PointCollection in the shape of a spiral  */
class Spiral {

    constructor(size) {
        this._assertValidSize(size)
        this.size = this._convertToWholeNumber(size);
        this.points = new PointCollection();
        this.currentDirection = Direction.Right;
        this.currentPointIndex = null;

        // Seed the spiral with the first two points
        // After points 0 and 1, the spiral algorithm takes over
        // If the size is 0 or 1, we don't need to run the algorithm
        this.points.add(new Point(0, 0));
        if(this.size === 0) {
            return;
        }
        this.points.add(new Point(1, 0));
        if(this.size === 1) {
            return; 
        }
        
        // Use the spiral algorithm to calculate the rest of the points
        this.currentPointIndex = 1;
        while(this.currentPointIndex < this.size) {
            if(this._shouldTurn()){
                this._changeDirection();
            } 
            this._moveToNextPoint();
        }
    }

    // PRIVATE METHODS

    _getCurrentPoint(){
        return this.points.getPointAt(this.currentPointIndex);
    }

    /** 
     * Returns true if there is an empty space to the right of the current point (facing the current direction) 
     * */
    _shouldTurn() {
        var targetPoint = this._getPotentialTurnPoint();
        var isEmpty = !this.points.contains(targetPoint);
        return isEmpty;
    }

    /** Gets the point to the right of the current point (facing the current direction) */
    _getPotentialTurnPoint() {
        var newDirection = this._getNextDirection();
        var currentPoint = this._getCurrentPoint();
        return currentPoint.getNextPoint(newDirection);
    }

   /** Gets the next direction, going clockwise  */
   _getNextDirection() {
        switch(this.currentDirection){
            case Direction.Up:
            case Direction.Right:
            case Direction.Down:
                return this.currentDirection + 1;
            case Direction.Left:
                return Direction.Up;
            default:
                throw new Error('bad direction');
        }
    }
 
    _changeDirection(){
        this.currentDirection = this._getNextDirection()
    }

    _moveToNextPoint(){
        const nextPoint = this._getCurrentPoint().getNextPoint(this.currentDirection);
        this.points.add(nextPoint);
        this.currentPointIndex++;
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

/** Class that renders a spiral as a string with proper whitespace and newline characters.  */
class StringRenderer {

    constructor(spiral){
        this.spiral = spiral
        this.pointCollection = spiral.points;
        this.spacingCharacter = ' ';
        this.newLineCharacter = '\n';
    }

    render(){
        this.grid = this.pointCollection.toGrid();
        return this._convertGridToString()
    }

    // Private method

    _convertGridToString(){
        var rows = this.grid.map((row) => this._padRow(row).join(this.spacingCharacter) );
        return rows.join(this.newLineCharacter)
    }

    
    _getSprialSize(){
        return this.spiral.size;
    }

    _createEmptyBlock(){
        let block = '';
        for(let i = 0; i < this._getPadAmount(); i++){
            block += this.spacingCharacter;
        }
        return block;
    }

    _padRow(row){
        return row.map(cell => this._padCell(cell));
    }

    _getPadAmount() {
        return String(this._getSprialSize()).length;
    }

    _padCell(cell) {
        var PAD_AMOUNT = this._getPadAmount(); 
    
        if(cell === null){
            return this._createEmptyBlock();
        }
    
        var strNumber = String(cell);
        while(strNumber.length < PAD_AMOUNT){
            strNumber += this.spacingCharacter;
        }
        return strNumber;
    }

}