import { useState } from "react";

const Countries = ({ countries, filter }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  // Helper function to render country details
  const renderCountryDetails = (country) => (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0] || "N/A"}</p>
      <p>Area: {country.area || "N/A"}</p>
      <h4>Languages:</h4>
      <ul>
        {country.languages ? (
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))
        ) : (
          <li>No language data available</li>
        )}
      </ul>
      <img
        src={country.flags?.png}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />
    </div>
  );

  return (
    <>
      <h2>Countries</h2>
      {/* if there are over 10 matches */}
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        renderCountryDetails(filteredCountries[0])
      ) : filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : (
        <div>
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3 || country.name.common}>
                {country.name.common}
                <button
                  onClick={() => setSelectedCountry(country)}
                  style={{ marginLeft: "10px" }}
                >
                  show
                </button>
              </li>
            ))}
          </ul>

          {/* Show selected country details */}
          {selectedCountry && (
            <div>
              <button
                onClick={() => setSelectedCountry(null)}
                style={{ marginBottom: "10px" }}
              >
                Hide details
              </button>
              {renderCountryDetails(selectedCountry)}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Countries;
