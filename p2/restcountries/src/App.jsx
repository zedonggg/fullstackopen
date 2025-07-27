import { useEffect, useState } from "react"
import axios from 'axios'

const CountryDisplay = ({searchTerm, countries}) => {
  if (searchTerm === '' || countries === null) {
    return <></>
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm))
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length != 1){
    return (
      <>
        {filteredCountries.map((country, index) => <div key={index}>{country.name.common}</div>)}
      </>
    )
  } else {
    return (
      <>
        <h1>{filteredCountries[0].name.common}</h1>
        <div>Capital {filteredCountries[0].capital}</div>
      </>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (countries === null) {
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => setCountries(res.data))
    }
  }, [])

  const searchHandler = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <div>find countries <input value={searchTerm} onChange={searchHandler}/></div>
      <CountryDisplay searchTerm={searchTerm} countries={countries} />
    </>
  )
}

export default App
