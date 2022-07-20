import React,{useEffect, useState} from 'react'

const Search = (props) => {
  const [searchText,setSearchText] = useState("")
  const handleChange = (e) => {
    setSearchText(e.target.value)
   

  }

  useEffect (() => {
    props.onSearch(searchText)
  })
  return (
    <div style={{textAlign: 'center'}}>
      <input type="text" placeholder='Search country'
      value={searchText}
      onChange={handleChange}
      >

      </input>
    </div>
  )
}

export default Search