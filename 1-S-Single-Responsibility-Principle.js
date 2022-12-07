//  Single responsibility principle

/*
A class or function should have one and the only reason to change. Each class should do one thing & do it well.
Instead of thinking that we should split code because it would look cleaner in a single file,
we split code up based on the users' social structure.
Because that's what dictates change. Few things to note:

    // Don't put functions in the same class that change for various causes.
    // Think responsibilities (reason to change) regarding the user who will use it.
    // The class should be low coupling & high cohesive.

*/

// -----------------------------------------------------------------------------------------------------------

// Example
// Lets have a class Journal that we can use to store text strings

import { writeFileSync } from 'fs';

class Journal
{
  constructor() {
    this.entries = {};
  }

  addEntry(text)
  {
    let counter = ++Journal.count;
    let entry = `${counter}: ${text}`;
    this.entries[counter] = entry;
    return counter;
  }

  removeEntry(index)
  {
    delete this.entries[index];
  }

  toString()
  {
    return Object.values(this.entries).join('\n');
  }

  // Bad idea to implement everything in a single class
  // Functions related to persistence and file manipulation should be on another class
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   // code
  // }
  //
  // loadFromUrl(url)
  // {
  //   // code
  // }
}

// The PersistenceManager class should be created to have all thins persistence related
// Instead of creating a god class with all the functions
class PersistenceManager
{
    saveToFile(journal, filename)
    {
        writeFileSync(filename, journal.toString());
    }

    // load(filename)
    // {
    //   // code
    // }
    //
    // loadFromUrl(url)
    // {
    //   // code
    // }
}

// --------------------------------

// Implementation and Test the code

Journal.count = 0;

let journal = new Journal();
journal.addEntry('I studied today.');
journal.addEntry('I cooked pancakes.');
console.log(journal.toString());

let persistence = new PersistenceManager();
let filename = 'c:/temp/journal.txt';
persistence.saveToFile(journal, filename);