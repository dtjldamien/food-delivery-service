import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MenuBar from "./MenuBar"
import {Carousel} from 'primereact/carousel';
import {Card} from 'primereact/card'
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
        {/* <Carousel value = {this.state.category} itemTemplate = {this.categoryTemplate} numVisible = {4}/> */}
        <h1>Please Choose A Category</h1>
          <Card title="Japanese" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
          <Card title="Western" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
          <Card title="Local" style={cardStyle}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
          </Card>
        <Card title="Indian" style={cardStyle}>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
        </Card>
      </div>
    )
  }

}

export default Home