import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { apiURL } from '../util/api';
import { Link } from 'react-router-dom';
import './CountryInfo.css'
const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const {countryName} = useParams();
  useEffect(() => {
    const getCountryByName = async () =>  {
      try{
        const res = await fetch(`${apiURL}/name/${countryName}`);
        if(!res.ok) throw new Error('Could Not Found!');
        const data = await res.json();
        setCountry(data);
        setIsLoading(false);
      } catch(error){
        setIsLoading(false);
        setError(error.message);
      }
    }
    getCountryByName()
  }, [countryName])
  return (
  <div className="country__info__wrapper">
    <button><Link to='/countries'>Back</Link></button>
    {
      isLoading && !error && <h4>Loading......</h4>
    }
    {
      error && !isLoading && <h4>{error}</h4>
    }
    {country?.map((country, index) => (
        <div className="country__info__container" key={index}>
          <div className="country__info-img">
            <img src={country.flags.png} alt="Country Flag" />
          </div>
          <div className="country__info">
            <h3>{country.name.common}</h3>
            <div className="country__info-left">
              <h5>Population: <span>{new Intl.NumberFormat().format(country.population)}</span></h5>
              <h5>Region: <span>{country.region}</span></h5>
              <h5>Sub Region: <span>{country.subregion}</span></h5>
              <h5>Capital: <span>{country.capital}</span></h5>
              <h5>Language: {Object.keys(country.languages).map(lang => <span> {country.languages[lang]}, </span>)}</h5>
            </div>
            <div>
              <h3>Border Countries: </h3>
              <div className="borderCountries">
                {country.borders.map(e => <button>{e}</button>)}
              </div>
            </div>
          </div>
        </div>
      ))}
  </div>
  )
};
export default CountryInfo;