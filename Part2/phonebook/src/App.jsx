import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");

    console.log("button clicked", event.target);
  };

  // Check if {newName} already exists
  const checkDuplicate = (name) => {
    return persons.some((person) => person.name === name);
  };

  // Filter persons based on input
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <div>
          Filter shown with:{" "}
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <h2>Add a new</h2>
        <form onSubmit={addPerson}>
          <div>
            name:{" "}
            <input
              value={newName}
              // Check for duplicates on change
              onChange={(e) => {
                setNewName(e.target.value);
                if (checkDuplicate(e.target.value)) {
                  alert(`${e.target.value} is already in the phonebook`);
                }
              }}
            />
          </div>
          <div>
            number:{" "}
            <input
              value={newNumber}
              // Check if number is only using numbers and dashes
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9-]*$/.test(value)) {
                  setNewNumber(value);
                } else {
                  alert("Invalid number format");
                }
              }}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
