import { useState, useEffect } from 'react';
import axios from 'axios';
import { CountryList } from './components/CountryList';

// function CountryList({ isLoading, data, searchText }) {
//   if (!isLoading && data.length > 0) {
//     const filteredCountries = data.filter((country) => {
//       return country.name.common.toLowerCase().includes(searchText);
//     });
//     if (filteredCountries.length > 10) {
//       return <div>Too many matches, specify another filter</div>;
//     } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
//       return (
//         <div>
//           {filteredCountries.map((country) => {
//             return <div>{country.name.common}</div>;
//           })}
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           {filteredCountries.map((country) => {
//             return <Country country={country} />;
//           })}
//         </div>
//       );
//     }
//   } else {
//     return <div>Loading</div>;
//   }
// }

function App() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      axios.get('https://restcountries.com/v3.1/all').then((response) => {
        setData(response.data);

        setIsLoading(false);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleInputSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="App">
      <div>
        find countries{' '}
        <input
          value={searchText}
          onChange={(e) => handleInputSearchChange(e)}
          type="text"
        />
      </div>
      <div>
        <CountryList
          isLoading={isLoading}
          data={data}
          searchText={searchText}
        />
      </div>
    </div>
  );
}

export default App;
