//useState for data store, useEffect for data fetch
import React,{useState,useEffect} from 'react'
import Countries from './component/Countries'
import "./App.css"
import Search from './component/Search'


// fetch data
const url = 'https://restcountries.com/v3.1/all'

const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)

  
  const fetchData = async(url) =>{
    setIsLoading(true)

    try{
      const response = await fetch(url)
      //converting response to json
      const data = await response.json()
      //store data
      setCountries(data)
      //copy data
      setFilteredCountries(data)

      setIsLoading(false)
      setError(null)

     
  
      
    } catch(error){
      setIsLoading(false)
      setError(error)

    }

  };




  useEffect(() => {

    fetchData(url)

  },[]);

  
  
  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter(
      (country) => country.name.common !== name
    );
    setFilteredCountries(filter);
  };


  const handleSearch = (searchValue) => {
    // convert to lowercase
    let value = searchValue.toLowerCase();
    // filter
    const newCountries = countries.filter((country) => {
      //convert to lowercase
      const countryName = country.name.common.toLowerCase();
      // starting name same hole show korbe
      return countryName.startsWith(value);
    });

    //filtered countries gulo dekhabe
    setFilteredCountries(newCountries);
    
  };



  return (
    <>
    <h1>Counry App</h1>
    <Search onSearch={handleSearch}/>
    {isLoading && <h2>Loading...</h2>}
    {error && <h2>{error.message} </h2>}


    {/* passing countries to Countries component */}
    { countries && (<Countries countries = {filteredCountries} onRemoveCountry ={handleRemoveCountry} />)}



    </>
  )
}

export default App
