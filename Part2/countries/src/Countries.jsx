const Countries = ({ countries, filter }) => {
  // Guard clause: return early if no countries data or no filter
  if (!countries || countries.length === 0) {
    return <div>Loading countries...</div>;
  }

  if (!filter || filter.trim() === "") {
    return <div>Enter a country name to search</div>;
  }

  // Filter countries based on input
  const filteredCountries = countries.filter((country) => {
    return country?.name?.common?.toLowerCase().includes(filter.toLowerCase());
  });

  console.log(
    `Filter: "${filter}", Found: ${filteredCountries.length} countries`
  );

  return (
    <>
      <h2>Countries</h2>
      {/* if there are over 10 matches */}
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h3>{filteredCountries[0].name.common}</h3>
          <p>Capital: {filteredCountries[0].capital?.[0] || "N/A"}</p>
          <p>Area: {filteredCountries[0].area || "N/A"}</p>
          <h4>Languages:</h4>
          <ul>
            {filteredCountries[0].languages ? (
              Object.values(filteredCountries[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))
            ) : (
              <li>No language data available</li>
            )}
          </ul>
          <img
            src={filteredCountries[0].flags?.png}
            alt={`Flag of ${filteredCountries[0].name.common}`}
            width="200"
          />
        </div>
      ) : filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3 || country.name.common}>
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Countries;
