const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
  persons,
}) => {
  // Check if {newName} already exists
  const checkDuplicate = (name) => {
    return persons.some((person) => person.name === name);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    onNameChange(value);

    // Check for duplicates on change
    if (checkDuplicate(value)) {
      alert(`${value} is already in the phonebook`);
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;

    // Check if number is only using numbers and dashes
    if (/^[0-9-]*$/.test(value)) {
      onNumberChange(value);
    } else {
      alert("Invalid number format");
    }
  };

  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
