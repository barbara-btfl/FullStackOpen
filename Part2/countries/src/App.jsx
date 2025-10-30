import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import countryService from "./services/countries.js";
import Countries from "./Countries.jsx";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("Fetching countries data...");
    countryService
      .getAll()
      .then((initialCountries) => {
        console.log("Countries loaded:", initialCountries.length);
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        alert("Failed to load countries data");
      });
  }, []);

  return (
    <>
      <Filter filter={filter} onFilterChange={setFilter} />
      <Countries countries={countries} filter={filter} />
      <div>
        <p>
          Data from{" "}
          <a href="https://studies.cs.helsinki.fi/restcountries/">
            https://studies.cs.helsinki.fi/restcountries/
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
