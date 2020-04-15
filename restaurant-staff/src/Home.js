import React from 'react';
import FoodItems from './FoodItems';

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
        <FoodItems />
      </div>
    )
  }

}

export default Home