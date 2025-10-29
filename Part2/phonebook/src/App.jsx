import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1, // Add id for new persons
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");

    console.log("button clicked", event.target);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onFilterChange={setFilter} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={addPerson}
        persons={persons}
      />

      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
