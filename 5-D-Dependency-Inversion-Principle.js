// Dependency inversion principle
// Entities must depend on abstractions not on concretions.
// It states that the high level module must not depend on the low level module, but they should depend on abstractions.

/* 
As a dynamic language, JavaScript doesn’t require the use of abstractions to facilitate decoupling.
Therefore, the stipulation that abstractions shouldn’t depend upon details isn’t particularly relevant to JavaScript applications.
The stipulation that high level modules shouldn’t depend upon low level modules is, however, relevant.

From a functional point of view, these containers and injection concepts can be solved with a simple higher order function,
or hole-in-the-middle type pattern which are built right into the language.

    Dependency: When one class is used inside another. As a result, our class is reliant on another.
                Your code should be based on abstraction rather than implementation.

    Low-level modules should not be relied upon by high-level modules.
                Abstractions should be used in both cases.

*/

// -----------------------------------------------------------------------------------------------------------

let Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2
});

class Person {
    constructor(name) {
        this.name = name;
    }
}

// LOW-LEVEL (STORAGE)

class RelationshipBrowser {
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser')
            throw new Error('RelationshipBrowser is abstract!');
    }

    findAllChildrenOf(name) { }
}

class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = []; // Possible liability
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        });
        this.data.push({
            from: child,
            type: Relationship.child,
            to: parent
        });
    }


    findAllChildrenOf(name) {
        return this.data.filter(r =>
            r.from.name === name &&
            r.type === Relationship.parent
        ).map(r => r.to);
    }
}

// HIGH-LEVEL (RESEARCH)
// Is not concerned about a low level function like storage
// It is concerned with high level stuff like retrieving data

class Research {
    // No DIP
    // constructor(relationships)
    // {
    //   // problem: direct dependence ↓↓↓↓ on storage mechanic
    //   let relations = relationships.data; // Accessing data from the low level module
    //   for (let rel of relations.filter(r =>
    //     r.from.name === 'John' &&
    //     r.type === Relationship.parent
    //   ))
    //   {
    //     console.log(`John has a child named ${rel.to.name}`);
    //   }
    // }

    // With DIP
    constructor(browser) {
        for (let p of browser.findAllChildrenOf('John')) {
            console.log(`John has a child named ${p.name}`);
        }
    }
}

// Creating objects
let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

// low-level module
let relationships = new Relationships();
relationships.addParentAndChild(parent, child1);
relationships.addParentAndChild(parent, child2);

new Research(relationships);