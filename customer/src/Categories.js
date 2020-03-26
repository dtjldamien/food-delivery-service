import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Card} from 'primereact/card'
import {Route, Link} from 'react-router-dom'
import Restaurants from "./Restaurants"
class Categories extends React.Component {
  constructor() {
      super()
      this.state = {
      }
  }
  render() {
    const cardStyle = {
      display: 'inline-block',
      width: '360px',
      padding: '5px',
      margin: '10px'
    }
    return (
      <div>
        <h1>Please Choose A Category</h1>
        <Link to={{
            pathname:'/restaurants', 
            state: {
                category: 'all'
            }
        }}>
          <Card title="All Restaurants" style={{background: 'lightgray'}}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
        </Link>
        <a href="restaurants/">
          <Card title="Japanese" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
        </a>
        <a href="restaurants/">
          <Card title="Western" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
        </a>
        <a href="restaurants/">
          <Card title="Local" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
        </a>
        <a href="restaurants/">
          <Card title="Indian" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
        </a>
       
      </div>
    )
  }

}

export default Categories