import React from 'react'
import Categories from './Categories';
class Home extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
      }
  }

  componentDidMount() {
    console.log(this.props)
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
