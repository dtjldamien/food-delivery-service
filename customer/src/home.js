import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MenuBar from "./MenuBar"
import {Carousel} from 'primereact/carousel';
import {Card} from 'primereact/card'
import Categories from './Categories';
class Home extends React.Component {
  constructor() {
      super()
      this.state = {
        category: [
           {name: "Japanese"}, 
           {name: "Western"},
           {name: "Local Delights"},
           {name: "Fast Food"}
        ]
      }
  }
  categoryTemplate(category) {
    const categoryStyle = {
      border: '2px solid grey',
      margin: '20px'
    }
    return (
      <div style = {categoryStyle}>
        <img src={`./resources/images/category/${category.name}.png`}/>
        <div>{category.name}</div>
      </div>
    )
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
        <MenuBar activeItem = "Home"/>
        <Categories/>
      </div>
    )
  }

}

export default Home