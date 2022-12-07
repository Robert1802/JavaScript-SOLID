// Open-closed Principle
// Objects or entities should be open for extension, but closed for modification.

/*

Software entities (classes, modules, functions, and so on) should be extensible but not modifiable ( no change in old code).
The above approach is based on the premise that we should be able to introduce new features without changing the present code.
Violation Open Closed Principle: a bunch of if or switch statements.

*/

// -----------------------------------------------------------------------------------------------------------

// Example

// ↓↓↓ BEFORE -----------------------------------------------------------------

// Creating properties objects
let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large',
    yuge: 'yuge'
});

// Products
let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

// Old way
class ProductFilter {
    filterByColor(products, color) {
        return products.filter(p => p.color === color);
    }

    filterBySize(products, size) {
        return products.filter(p => p.size === size);
    }

    filterBySizeAndColor(products, size, color) {
        return products.filter(p =>
            p.size === size && p.color === color);
    }

    // Whenever we want to add something to the product filter we would have to create another method here
    // state space explosion
    // 3 criteria (+weight) = 7 methods

}

let oldProductFilter = new ProductFilter();
console.log(`Green products (old):`);
for (let p of oldProductFilter.filterByColor(products, Color.green))
  console.log(` * ${p.name} is green`);

// ↑↑↑ BEFORE -----------------------------------------------------------------

// ↓↓↓ AFTER -----------------------------------------------------------------

// General interface for a specification
// Specification Pattern
class ColorSpecification {
    constructor(color) {
        this.color = color;
    }

    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

class BetterFilter {
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x));
    }
}

// Specification combinator
// Specification that combines other specifications
class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }

    isSatisfied(item) {
        return this.specs.every(x => x.isSatisfied(item));
    }
}

let betterFilter = new BetterFilter();

console.log(`Green products (new):`);
for (let p of betterFilter.filter(products,
    new ColorSpecification(Color.green))) {
    console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);
for (let p of betterFilter.filter(products,
    new SizeSpecification(Size.large))) {
    console.log(` * ${p.name} is large`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
);

for (let p of betterFilter.filter(products, spec))
    console.log(` * ${p.name} is large and green`);

// ↑↑↑ AFTER -----------------------------------------------------------------