// Liskov substitution principle
// Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objects y of type S where S is a subtype of T.

/*

All this is stating is that every subclass/derived class should be substitutable for their base/parent class.
In other words, as simple as that, a subclass should override the parent class methods in a way that does not break functionality from a client’s point of view.

*/

// -----------------------------------------------------------------------------------------------------------

class Rectangle
{
  constructor(width, height)
  {
    this._width = width;
    this._height = height;
  }

  // Might have different values for Width and Height
  // Getters
  get width() { return this._width; }
  get height() { return this._height; }
  // Setters
  set width(value) { this._width = value; }
  set height(value) { this._height = value; }

  get area()
  {
    return this._width * this._height;
  }

  toString()
  {
    return `${this._width}×${this._height}`;
  }
}

// Square is a Subclass of Rectangle
class Square extends Rectangle
{
  constructor(size)
  {
    super(size, size);
  }

  // Setters for square is the same for Width and Height
  set width(value)  {this._width = this._height = value;}
  set height(value) {this._width = this._height = value;  }
}

let useIt = function(rectangle) {
  let width = rectangle._width;
  rectangle.height = 10; // It breaks the code
  console.log(`Expected area of ${10*width}, ` + `got ${rectangle.area}` );
};

let rectangle = new Rectangle(2,3);
useIt(rectangle);

let sq = new Square(5);
useIt(sq);