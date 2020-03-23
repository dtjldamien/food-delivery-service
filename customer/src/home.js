import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Home = props => {
    useEffect(() => {
      axios.get('/api/hello')
        .then(res => setState(res.data))
    }, [])

    const [state, setState] = useState('')

  return(
    <div>
      Home
      <p>{state}</p>
    </div>
 )
};

export default Home;