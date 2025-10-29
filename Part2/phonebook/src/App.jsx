import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    setPersons(persons.concat(personObject));
    setNewName("");

    console.log("button clicked", event.target);
  };

  // Check if {newName} already exists
  const checkDuplicate = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
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
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
