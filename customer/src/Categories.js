import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Carousel} from 'primereact/carousel';
import {Card} from 'primereact/card';
import { Link, Route } from 'react-router-dom';
import Restaurants from './Restaurants'

class Categories extends React.Component {
  constructor() {
      super()
      this.state = {
        categories: []
      }
  }

  componentDidMount() {
    axios.get('/api/get/getCategories')
      .then(data => data.data.map(catname => catname.catname))
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
        <div>
          <Link to={{pathname:`/restaurants/${catname}`,state:{catname:{catname}}}}>
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