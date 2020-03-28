import React from 'react'
import axios from 'axios';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

class Categories extends React.Component {
  constructor() {
      super()
      this.state = {
        categories: []
      }
  }

  componentDidMount() {
    axios.get('/api/get/getCategories')
      .then(data => data.data.map(catArr => catArr.catname))
      .then(catnames => this.setState( {categories : catnames }))
      .catch(err => console.log(err))
  }

  createCards() {
    let categories = []

    const cardStyle = {
      display: 'inline-block',
      width: '360px',
      padding: '5px',
      margin: '10px'
    }

    this.state.categories.map(catname => {
      categories.push(
        <div style ={cardStyle}>
          <Link to={{
            pathname:`/restaurants/${catname}`,
            state: {
              catname: {catname}
            }
          }}>
            <Card title={catname} style={cardStyle}/>
          </Link>
        </div>
      )
    })
    return categories
  }

  render() {
    console.log(this.state.categories)

    const cardStyle = {
      display: 'inline-block',
      width: '360px',
      padding: '5px',
      margin: '10px'
    }

    return (
      <div>
        <h1>Please Choose A Category</h1>
          {this.createCards()}

      </div>
    )
  }

}

export default Categories