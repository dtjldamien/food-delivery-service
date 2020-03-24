import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MenuBar from "./MenuBar"
const Home = props => {
    useEffect(() => {
      axios.get('/api/hello')
        .then(res => setState(res.data))
    }, [])

    const [state, setState] = useState('')

  return(
    <div>
      <MenuBar activeItem = "Home"/>
      <h4>Restaurant Listing</h4>
      <p>{state}</p>
    </div>
 )
};

export default Home;