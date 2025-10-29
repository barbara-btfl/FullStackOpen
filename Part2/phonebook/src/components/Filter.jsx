const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input value={filter} onChange={(e) => onFilterChange(e.target.value)} />
    </div>
  );
};

export default Filter;
