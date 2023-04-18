import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showCountryDetails = (country) => {
    setCountries([country]);
  };

  const renderFilteredCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>narrow the search with filter</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => showCountryDetails(country)}>Show information</button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Official Languages:</p>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.svg} alt={country.name.common} width="200" />
        </div>
      );
    } else {
      return <p>No countries found</p>;
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      <input type="text" value={filter} onChange={handleFilterChange} />
      {renderFilteredCountries()}
    </div>
  );
}

export default App;
