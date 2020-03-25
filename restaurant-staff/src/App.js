import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  // componentDidMount() {
  //   const data = {
  //     email: "A@email.com"
  //   }

  //   axios.get('api/get/login', {params: {data}})
  //     .then(response => console.log(response))
  //     .catch((err) => console.log(err))
  // }

  componentDidMount() {
    const profile = {
      rname:'Restaurant C',
      address:'C',
      minimumSpending:30
    }

    axios.post('/api/post/createRestaurant', {params: profile})
      .then(response => console.log(response))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>test</h1>
      </div>
    );
  }
}

export default App;
