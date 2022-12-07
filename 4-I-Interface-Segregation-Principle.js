// Interface segregation
// "Clients should not be pushed to employ interfaces that they are unfamiliar with or they don't want to use"

/* 

This approach aims to reduce the negative consequences of using large interfaces by breaking them down into smaller ones.
It's similar to the Single Responsibility Principle, which asserts that any class or interface should be used for only one purpose.

Note: JS does not have an interface, JS have DuckTaping

Clients should not be exposed to methods that they do not require
(design a tiny interface that does not force any class or function to use an interface they do not wish to use).

*/

// -----------------------------------------------------------------------------------------------------------

// Aggregation exists for multiple inheritance
var aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this, (new mixin));
            });
        }
    }
    let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })
    };
    mixins.forEach((mixin) => {
        // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
};

// -----------------------------------------------------------------------------------------------------------

class Document {

}

class Machine {
    constructor() {
        if (this.constructor.name === 'Machine') // This class should not be instantiated directly, only inherited
            throw new Error('Machine is abstract!');
    }

    // Methods that should be overridden
    print(doc) { }
    fax(doc) { }
    scan(doc) { }
}

// Classing that inherits Machine and override all the functions
class MultiFunctionPrinter extends Machine {
    print(doc) {
        //
    }

    fax(doc) {
        //
    }

    scan(doc) {
        //
    }
}

class NotImplementedError extends Error {
    constructor(name) {
        let msg = `${name} is not implemented!`;
        super(msg);
        // maintain proper stack trace
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, NotImplementedError);
        // Custom stuff here
    }
}

// Classing that inherits Machine and override only some of the functions
class OldFashionedPrinter extends Machine {
    print(doc) {
        // ok
    }

    // Omitting this is the same as no-op implement
    // fax(doc) {
    //   // do nothing
    //   // Principle of least surprise (it should do the expected)
    // }

    scan(doc) {
        // If someone tries to implement a scan method even thou it is not supposed to
        // You can make it throw an error instead of just omitting
        // throw new Error('not implemented!');
        throw new NotImplementedError(
            'OldFashionedPrinter.scan')
    }
}

// -----------------------------------------------------------------------------------------------------------

// Solution
// ISP = implement interfaces into different parts so people don't implement more than what they need

// A Printer Class that only implement a print method
class Printer {
    constructor() {
        if (this.constructor.name === 'Printer')
            throw new Error('Printer is abstract!');
    }

    print() { }
}

// A Scanner Class that only implement a scan method
class Scanner {
    constructor() {
        if (this.constructor.name === 'Scanner')
            throw new Error('Scanner is abstract!');
    }

    scan() { }
}

// A Photocopier Class that can print and sacan
// Aggregation exists for multiple inheritance
// But that is one thing that we should avoid
class Photocopier extends aggregation(Printer, Scanner)
{
    print() {
        // IDE won't help you here
    }

    scan() {
        //
    }
}

// We don't allow this!
// No direct instantiation of the Machine Class
// let m = new Machine();
let printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
printer.scan(); // throws an error