import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Deleted ${name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(() => {
          setErrorMessage(`${name} is already removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`Update ${newName}'s number to ${newNumber}?`)) {
        personService
          .update(existingPerson.id, { name: newName, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setSuccessMessage(`Updated ${newName}'s number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            // Check if it's a 404 error (person already removed from server)
            if (error.response && error.response.status === 404) {
              setErrorMessage(`${newName} is already removed from server`);
              // Remove the person from local state since it doesn't exist on server
              setPersons(
                persons.filter((person) => person.id !== existingPerson.id)
              );
            } else {
              setErrorMessage(`Failed to update ${newName}'s information`);
            }
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
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

      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
