import React from "react";
import './App.css';
import {Routes, Route} from 'react-router-dom'
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryIfon/CountryInfo";
function App() {
  return (
    <>
      <header className="header">
        <div className="container">
          <h5>Where in the World</h5>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/countries" exact element={<AllCountries />} />
          <Route path="/countries/country/:countryName" element={<CountryInfo />} />
        </Routes>
      </div>
    </>
  )
}
export default App;
