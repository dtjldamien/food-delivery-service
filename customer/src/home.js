import React, { useState, useEffect } from 'react'
import Categories from './Categories';
class Home extends React.Component {
  constructor() {
      super()
      this.state = {
      }
  }
  render() {
    return (
      <div>
        <Categories/>
      </div>
    )
  }

}

export default Home