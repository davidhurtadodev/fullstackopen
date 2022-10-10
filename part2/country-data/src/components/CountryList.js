import { Country } from './Country';

export function CountryList({ isLoading, data, searchText }) {
  if (!isLoading && data.length > 0) {
    const filteredCountries = data.filter((country) => {
      return country.name.common.toLowerCase().includes(searchText);
    });
    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map((country) => {
            return <Country country={country} />;
          })}
        </div>
      );
    } else {
      return (
        <div>
          {filteredCountries.map((country) => {
            return <Country country={country} />;
          })}
        </div>
      );
    }
  } else {
    return <div>Loading</div>;
  }
}
