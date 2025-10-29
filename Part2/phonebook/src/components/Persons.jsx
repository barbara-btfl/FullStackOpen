const Persons = ({ persons, filter, onDelete }) => {
  // Filter persons based on input
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
